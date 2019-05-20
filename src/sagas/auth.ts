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
  ME,
  ME_FAILURE,
  ME_SUCCESS,
} from '../constants/ActionTypes';
import { AuthAction, Signin, Logout } from '../actions/auth';
import * as authApi from '../api/auth';
import * as authUtil from '../utils/auth';
import { ModalAction } from '../actions/modal';
import { notifier } from '../utils/renoti';
import { history } from '../utils/history';

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
function* verifyMe() {
  try {
    const { result }: SagaEffect<typeof authApi.me> = yield call(
      authApi.me,
      null,
    );
    if (!result) {
      authUtil.removeToken();
    }
    yield put<AuthAction>({
      type: ME_SUCCESS,
      payload: result,
    });
  } catch (err) {
    yield put<AuthAction>({
      type: ME_FAILURE,
      payload: err.response ? err.reponse.data : '',
    });
  } finally {
    if (yield cancelled()) {
      yield put<AuthAction>({
        type: ME_FAILURE,
        payload: '',
      });
    }
  }
}
// signin / verify 둘 중 하나로 로그인
function* watchSignin() {
  while (true) {
    const action: AuthAction = yield take([SIGNIN, ME]);
    const verifyTask =
      action.type === SIGNIN
        ? yield fork(signin, action)
        : yield fork(verifyMe);
    const followAction: AuthAction = yield take([
      LOGOUT,
      SIGNIN_FAILURE,
      ME_FAILURE,
    ]);
    if (followAction.type === 'LOGOUT') {
      yield cancel(verifyTask);
    }
    authUtil.removeToken();
    yield put<AuthAction>({
      type: LOGOUT,
    });
    history.push('/');
  }
}
export default function* root() {
  yield all([fork(watchSignin)]);
  // localstorage에 token이 있을 경우 초기 verify를 진행한다.
  const token = authUtil.getToken();
  if (token) {
    authUtil.setToken(token);
  }
  // verify action 디스패치.
  // token 있으면 ME put 해서 검증. 없으면 SUCCESS로 넣고 null 처리.
  yield put<AuthAction>({
    type: token ? ME : ME_SUCCESS,
    payload: null,
  } as AuthAction);
  // type infer가 안됨. 확인해야봐야할듯.
}
