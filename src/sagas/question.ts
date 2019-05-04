import { all, call, take, fork, put, select } from 'redux-saga/effects';
import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
} from '../constants/ActionTypes';
import {
  PostQuestion,
  GetQuestions,
  QuestionAction,
} from '../actions/question';
import * as questionApi from '../api/question';
import { IRootState } from '../reducers';
import { history } from '../utils/history';

const selectQuestionList = (state: IRootState) =>
  state.question.getList.questions;

function* getList(action: GetQuestions) {
  try {
    const {
      page,
      nextPage,
      items,
    }: SagaEffect<typeof questionApi.getQuestions> = yield call(
      questionApi.getQuestions,
      action.payload,
    );

    const isInit = page === 1;
    const currentItems: ReturnType<typeof selectQuestionList> = yield select(
      selectQuestionList,
    );

    yield put<QuestionAction>({
      type: GET_QUESTIONS_SUCCESS,
      payload: {
        items: isInit ? items : currentItems.concat(items),
        page,
        hasNext: !!nextPage,
      },
    });
  } catch (err) {
    yield put<QuestionAction>({
      type: GET_QUESTIONS_FAILURE,
      payload: err.response ? err.response.data : '',
    });
  }
}
function* post(action: PostQuestion) {
  try {
    const { result }: SagaEffect<typeof questionApi.postQuestion> = yield call(
      questionApi.postQuestion,
      action.payload,
    );
    yield put<QuestionAction>({
      type: POST_QUESTION_SUCCESS,
      payload: result,
    });
    history.push(`/question/${result.id}`, { new: true });
  } catch (err) {
    yield put<QuestionAction>({
      type: POST_QUESTION_FAILURE,
      payload: err.response ? err.response.data : '',
    });
  }
}
function* watchGetList() {
  while (true) {
    const action: GetQuestions = yield take(GET_QUESTIONS);
    yield call(getList, action);
  }
}
function* watchPost() {
  while (true) {
    const action: PostQuestion = yield take(POST_QUESTION);
    yield call(post, action);
  }
}
export default function* root() {
  yield all([fork(watchGetList), fork(watchPost)]);
}
