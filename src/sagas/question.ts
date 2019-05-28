import { all, call, take, fork, put, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import {
  POST_QUESTION,
  GET_QUESTION,
  GET_QUESTIONS,
  REQUEST_SEARCH_QUESTIONS,
} from '../constants/ActionTypes';
import {
  PostQuestion,
  GetQuestions,
  QuestionAction,
  GetQuestion,
  postQuestionActions,
  getQuestionActions,
  getQuestionsActions,
  RequestSearchQuestions,
  searchQuestionsActions,
} from '../actions/question';
import * as questionApi from '../api/question';
import { IRootState } from '../reducers';
import { history } from '../utils/history';
import { fetchEntity } from '../utils/saga';
import { ISearchQuestionQuery } from '../models/api';

const selectQuestionList = (state: IRootState) =>
  state.question.getList.questions;

const fetchSearchedQuestions = fetchEntity(
  searchQuestionsActions,
  questionApi.searchQuestions,
);

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
function* search(query: ISearchQuestionQuery, isInit: boolean) {
  const { page, perPage, ...searchQueryWithFalsy } = query;
  const searchQuery = omitBy(searchQueryWithFalsy, isEmpty);
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
function* watchSearch() {
  while (true) {
    const action: RequestSearchQuestions = yield take(REQUEST_SEARCH_QUESTIONS);
    yield fork(search, action.payload.searchQuery, action.payload.isInit);
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
