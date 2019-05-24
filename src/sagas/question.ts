import { all, call, take, fork, put, select } from 'redux-saga/effects';
import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
} from '../constants/ActionTypes';
import {
  PostQuestion,
  GetQuestions,
  QuestionAction,
  GetQuestion,
  postQuestionActions,
  getQuestionActions,
  getQuestionsActions,
} from '../actions/question';
import * as questionApi from '../api/question';
import { IRootState } from '../reducers';
import { history } from '../utils/history';

const selectQuestionList = (state: IRootState) =>
  state.question.getList.questions;

function* get(action: GetQuestion) {
  try {
    const { result }: SagaEffect<typeof questionApi.getQuestion> = yield call(
      questionApi.getQuestion,
      action.payload,
    );
    yield put<QuestionAction>(getQuestionActions.success(result));
  } catch ({ response = {} }) {
    yield put<QuestionAction>(getQuestionActions.failure(response.data || ''));
  }
}
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

    yield put<QuestionAction>(
      getQuestionsActions.success({
        items: isInit ? items : currentItems.concat(items),
        page,
        hasNext: !!nextPage,
      }),
    );
  } catch ({ response = {} }) {
    yield put<QuestionAction>(getQuestionsActions.failure(response.data || ''));
  }
}
function* post(action: PostQuestion) {
  try {
    const { result }: SagaEffect<typeof questionApi.postQuestion> = yield call(
      questionApi.postQuestion,
      action.payload,
    );
    yield put<QuestionAction>(postQuestionActions.success(result));
    history.push(`/question/${result.id}`, { new: true });
  } catch ({ response = {} }) {
    yield put<QuestionAction>(postQuestionActions.failure(response.data || ''));
  }
}
function* watchGet() {
  while (true) {
    const action: GetQuestion = yield take(GET_QUESTION);
    yield call(get, action);
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
  yield all([fork(watchGet), fork(watchGetList), fork(watchPost)]);
}
