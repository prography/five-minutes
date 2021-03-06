import { all, call, take, fork, put, select } from 'redux-saga/effects';
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
  UPDATE_LIST_QUERY,
  LOAD_TAGGED_QUESTIONS,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
} from '../constants/ActionTypes';
import {
  PostQuestion,
  GetQuestions,
  QuestionAction,
  GetQuestion,
  postQuestionActions,
  getQuestionActions,
  getQuestionsActions,
  searchQuestionsActions,
  setQuestionSearchMode,
  updateListQuery,
  LoadTaggedQuestions,
  deleteQuestionActions,
  DeleteQuestion,
} from '../actions/question';
import * as questionApi from '../api/question';
import { IRootState } from '../reducers';
import { history } from '../utils/history';
import { fetchEntity } from '../utils/saga';
import { ISearchQuestionQuery, IBaseListQuery } from '../models/api';
import { notifier } from '../utils/renoti';

const selectQuestionList = (state: IRootState) =>
  state.question.getList.questions;

const fetchDeleteUser = fetchEntity(
  deleteQuestionActions,
  questionApi.deleteQuestion,
);

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
function* watchDelete() {
  while (true) {
    const action: DeleteQuestion = yield take(DELETE_QUESTION);
    yield fork(fetchDeleteUser, action.payload);
    const { type } = yield take([
      DELETE_QUESTION_SUCCESS,
      DELETE_QUESTION_FAILURE,
    ]);
    if (type === DELETE_QUESTION_SUCCESS) {
      notifier.notify({
        type: 'success',
        message: '성공적으로 삭제되었습니다.',
      });
    } else {
      notifier.notify({
        type: 'error',
        message: '삭제에 실패하였습니다. 다시 시도해주세요.',
      });
    }
  }
}
function* watchSearch() {
  while (true) {
    const {
      type,
      payload: { listQuery = {}, searchQuery = {} },
    } = yield take([LOAD_SEARCHED_QUESTIONS, UPDATE_LIST_QUERY]);

    let listQueryReq: IBaseListQuery = listQuery;
    let searchQueryReq: ISearchQuestionQuery = searchQuery;
    if (type === UPDATE_LIST_QUERY) {
      const prevSearchSubject = yield select(
        (state: IRootState) => state.question.search.searchQuery.subject,
      );
      searchQueryReq.subject = prevSearchSubject;
    }
    // TODO: /tagged/javascript 이런식의 태그검색 처리 로직 넣기
    const { isTagSearch, tags } = yield select((state: IRootState) => ({
      isTagSearch: state.question.search.isTagSearch,
      tags: state.auth.me.user.tags.map(tag => tag.name),
    }));
    if (isTagSearch) {
      searchQueryReq.tags = tags;
    }
    yield fork(search, listQueryReq, searchQueryReq);
  }
}
function* watchTagSearch() {
  while (true) {
    const { payload }: LoadTaggedQuestions = yield take(LOAD_TAGGED_QUESTIONS);
    const { listQuery, tag } = payload;
    if (tag) {
      yield fork(search, listQuery, { tags: [tag] });
    }
  }
}
// Watched Tags 바뀔 때 search 다시
function* watchWatchedTags() {
  while (true) {
    yield take([SET_WATCHED_TAGS, SET_QUESTION_SEARCH_MODE]);
    const hasSearched = yield select(
      (state: IRootState) => state.question.search.status === 'INIT',
    );
    // TODO: 다른 방법으로 search 인지 확인하기
    if (history.location.pathname === '/search' && !hasSearched) {
      yield put(updateListQuery({ page: 1 }));
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
    fork(watchDelete),
    fork(watchSearch),
    fork(watchTagSearch),
    fork(watchWatchedTags),
    fork(watchAuth),
  ]);
}
