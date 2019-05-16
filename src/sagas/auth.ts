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
  LOGOUT,
  CLOSE_MODAL,
} from '../constants/ActionTypes';
import { AuthAction, Signin, Logout } from '../actions/auth';
import * as authApi from '../api/auth';
import * as authUtil from '../utils/auth';
import { ModalAction } from '../actions/modal';
import { notifier } from '../utils/renoti';

function* signin(action: Signin) {
  try {
    const { result }: SagaEffect<typeof authApi.signin> = yield call(
      authApi.signin,
      action.payload,
    );
    authUtil.setToken(result.token);
    yield put<AuthAction>({
      type: SIGNIN_SUCCESS,
      payload: result,
    });
    yield put<ModalAction>({
      type: CLOSE_MODAL,
    });
    notifier.notify({ message: `환영합니다! ${result.nickname}님 👋` });
  } catch (err) {
    yield put<AuthAction>({
      type: SIGNIN_FAILURE,
      payload: err.response ? err.response.data : '',
    });
  } finally {
    if (yield cancelled()) {
      yield put<AuthAction>({
        type: SIGNIN_FAILURE,
        payload: '',
      });
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
    authUtil.removeToken();
    yield put<AuthAction>({
      type: LOGOUT,
    });
  }
}
export default function* root() {
  yield all([fork(watchSignin)]);
}
