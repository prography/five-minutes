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
  LOGOUT,
  ME,
  ME_FAILURE,
  ME_SUCCESS,
} from '../constants/ActionTypes';
import {
  AuthAction,
  Signin,
  signinActions,
  meActions,
} from '../actions/auth';
import * as authApi from '../api/auth';
import * as authUtil from '../utils/auth';
import { closeModal, ModalAction } from '../actions/modal';
import { notifier } from '../utils/renoti';

function* signin(action: Signin) {
  try {
    const { result }: SagaEffect<typeof authApi.signin> = yield call(
      authApi.signin,
      action.payload,
    );
    authUtil.setToken(result.token);
    yield put<AuthAction>(signinActions.success(result));
    yield put<ModalAction>(closeModal());
    notifier.notify({ message: `환영합니다! ${result.nickname}님 👋` });
  } catch ({ response = {} }) {
    yield put<AuthAction>(signinActions.failure(response.data || ''));
  } finally {
    if (yield cancelled()) {
      yield put<AuthAction>(signinActions.failure('Signin Cancelled'));
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
    yield put<AuthAction>(meActions.success(result));
  } catch ({ response = {} }) {
    yield put<AuthAction>(meActions.failure(response.data || ''));
  } finally {
    if (yield cancelled()) {
      yield put<AuthAction>(meActions.failure('Cancelled'));
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
