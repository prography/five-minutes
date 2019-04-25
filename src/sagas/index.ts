import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import questionSaga from './question';

function* rootSaga() {
  yield all([fork(authSaga), fork(questionSaga)]);
}

export default rootSaga;
