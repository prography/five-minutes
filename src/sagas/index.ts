import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default rootSaga;
