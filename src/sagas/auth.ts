import { all, fork, call, put, take } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { IInitAction } from '../actions/auth';

function init(action: IInitAction) {
  console.log(`${action.type} dispatched!`);
}
function* watchInit() {
  while (true) {
    const action = yield take(ActionTypes.INIT_ACTION);
    yield call(init, action);
  }
}
export default function* root() {
  yield all([fork(watchInit)]);
}
