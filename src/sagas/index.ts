import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import questionSaga from './question';
import userSaga from './user';

function* rootSaga() {
  yield all([fork(authSaga), fork(questionSaga), fork(userSaga)]);
}

export default rootSaga;
