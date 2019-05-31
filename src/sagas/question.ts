import { all, call, take, fork, put, select, cancel } from 'redux-saga/effects';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import {
  POST_QUESTION,
  GET_QUESTION,
  GET_QUESTIONS,
  LOAD_SEARCHED_QUESTIONS,
  SIGNIN_SUCCESS,
  LOGOUT,
  ME_SUCCESS,
  SET_WATCHED_TAGS,
  SET_QUESTION_SEARCH_MODE,
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
  setQuestionSearchMode,
  loadSearchedQuestions,
} from '../actions/question';
import * as questionApi from '../api/question';
import { IRootState } from '../reducers';
import { history } from '../utils/history';
import { fetchEntity } from '../utils/saga';
import { ISearchQuestionQuery, IBaseListQuery } from '../models/api';
import { ITag } from '../models/tag';

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
function* watchPost() {
  while (true) {
    const action: PostQuestion = yield take(POST_QUESTION);
    yield call(post, action);
  }
}
function* watchSearch() {
  while (true) {
    const action = yield take([LOAD_SEARCHED_QUESTIONS]);
    const { prevlistQuery, prevSearchQuery, isTagSearch, tags } = yield select(
      (state: IRootState) => ({
        prevlistQuery: {
          page: state.question.search.page,
          perPage: state.question.search.perPage,
        },
        prevSearchQuery: state.question.search.searchQuery,
        isTagSearch: state.question.search.isTagSearch,
        tags: state.auth.me.user.tags,
      }),
    );
    // 이전 search 사용
    const { listQuery, searchQuery = prevSearchQuery } = action.payload;
    // 태그 검색시 tag추가
    if (isTagSearch && tags) {
      searchQuery.tags = tags.map((tag: ITag) => tag.name);
    }
    yield fork(search, { ...prevlistQuery, ...listQuery }, searchQuery);
  }
}
// Watched Tags 바뀔 때 search 다시
function* watchWatchedTags() {
  while (true) {
    yield take([SET_WATCHED_TAGS, SET_QUESTION_SEARCH_MODE]);
    const hasSearched = yield select(
      (state: IRootState) => state.question.search.status === 'INIT',
    );
    if (history.location.search && !hasSearched) {
      yield put<RequestSearchQuestions>(loadSearchedQuestions({}));
    }
  }
}
// 로그인/로그아웃에 따라 searchmode 변경
function* watchAuth() {
  while (true) {
    const action = yield take([SIGNIN_SUCCESS, ME_SUCCESS, LOGOUT]);
    yield put(setQuestionSearchMode(action.type !== LOGOUT));
  }
}
export default function* root() {
  yield all([
    fork(watchGet),
    fork(watchGetList),
    fork(watchPost),
    fork(watchSearch),
    fork(watchWatchedTags),
    fork(watchAuth),
  ]);
}
