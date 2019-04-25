import { all, call, take, fork, put } from 'redux-saga/effects';
import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
} from '../constants/ActionTypes';
import { PostQuestion } from '../actions/question';
import * as questionApi from '../api/question';

function* post(action: PostQuestion) {
  try {
    const result: SagaEffect<typeof questionApi.postQuestion> = yield call(
      questionApi.postQuestion,
      action.payload,
    );
    yield put({
      type: POST_QUESTION_SUCCESS,
      question: result,
    });
  } catch (err) {
    yield put({
      type: POST_QUESTION_FAILURE,
      error: err.response ? err.response.data : '',
    });
  }
}
function* watchPost() {
  while (true) {
    const action: PostQuestion = yield take(POST_QUESTION);
    yield call(post, action);
  }
}
export default function* root() {
  yield all([fork(watchPost)]);
}
