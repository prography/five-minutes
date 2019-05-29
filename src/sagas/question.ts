import { all, call, take, fork, put, select } from 'redux-saga/effects';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {
  POST_QUESTION,
  GET_QUESTION,
  GET_QUESTIONS,
  LOAD_SEARCHED_QUESTIONS,
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
import { ISearchQuestionQuery, IBaseListQuery } from '../models/api';

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
function* search(listQuery: IBaseListQuery, searchQuery: ISearchQuestionQuery) {
  const prunedSearchQuery = pickBy(searchQuery, identity);
  yield call(fetchSearchedQuestions, listQuery, prunedSearchQuery);
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
    const action: RequestSearchQuestions = yield take([
      LOAD_SEARCHED_QUESTIONS,
    ]);
    const { page, perPage, prevSearchQuery } = yield select(
      (state: IRootState) => ({
        page: state.question.search.page,
        perPage: state.question.search.perPage,
        prevSearchQuery: state.question.search.searchQuery,
      }),
    );
    // 이전 search 사용
    const { listQuery, searchQuery = prevSearchQuery } = action.payload;

    yield fork(search, { page, perPage, ...listQuery }, searchQuery);
  }
}
function* watchPost() {
  while (true) {
    const action: PostQuestion = yield take(POST_QUESTION);
    yield call(post, action);
  }
}
export default function* root() {
  yield all([
    fork(watchGet),
    fork(watchGetList),
    fork(watchPost),
    fork(watchSearch),
  ]);
}
