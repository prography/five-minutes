import {
  all,
  fork,
  call,
  put,
  take,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import {
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
} from '../constants/ActionTypes';
import { AuthAction, Signin, Logout } from '../actions/auth';
import * as authApi from '../api/auth';

function* signin(action: Signin) {
  try {
    const { result }: SagaEffect<typeof authApi.signin> = yield call(
      authApi.signin,
      action.payload,
    );
    yield put<AuthAction>({
      type: SIGNIN_SUCCESS,
      payload: result,
    });
  } catch (err) {
    yield put<AuthAction>({
      type: SIGNIN_FAILURE,
      payload: err.response ? err.response.data : '',
    });
  } finally {
    if (yield cancelled()) {
      // signin cancelled.
    }
  }
}
function* watchSignin() {
  while (true) {
    const action: Signin = yield take(SIGNIN);
    const signinTask = yield fork(signin, action);
    const laterAction: AuthAction = yield take(['LOGOUT', 'SIGNIN_FAILURE']);
    if (laterAction.type === 'LOGOUT') {
      yield cancel(signinTask);
    }
    // TODO: logout api
  }
}
export default function* root() {
  yield all([fork(watchSignin)]);
}
