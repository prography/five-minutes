import { all, fork, call, take, select } from 'redux-saga/effects';
import { fetchEntity } from '../utils/saga';
import {
  getUserActions,
  getUserQuestionsActions,
  getUserCommentsActions,
  LoadUser,
  LoadUserQuestions,
  LoadUserComments,
} from '../actions/user';
import { getUser, getUserQuestions, getUserComments } from '../api/user';
import {
  LOAD_USER,
  LOAD_USER_QUESTIONS,
  LOAD_USER_COMMENTS,
} from '../constants/ActionTypes';
import { IBaseListQuery } from '../models/api';
import { IRootState } from '../reducers';

const fetchGetUser = fetchEntity(getUserActions, getUser);
const fetchGetUserQuestions = fetchEntity(
  getUserQuestionsActions,
  getUserQuestions,
);
const fetchGetUserComments = fetchEntity(
  getUserCommentsActions,
  getUserComments,
);

function* fetchUser(id: string) {
  yield call(fetchGetUser, id);
}
function* fetchUserQuestions(id: string, query: IBaseListQuery) {
  // 다음 페이지가 있거나, page 가 1 일 때 (init) 요청
  const { hasNext } = yield select((state: IRootState) => ({
    hasNext: !!state.user.questions.nextPage,
  }));
  if (hasNext || query.page === 1) {
    yield call(fetchGetUserQuestions, id, query);
  }
}
function* fetchUserComments(id: string, query: IBaseListQuery) {
  const { hasNext } = yield select((state: IRootState) => ({
    hasNext: !!state.user.comments.nextPage,
  }));
  if (hasNext || query.page === 1) {
    yield call(fetchGetUserComments, id, query);
  }
}
function* watchGetUser() {
  while (true) {
    const action: LoadUser = yield take(LOAD_USER);
    const userId = action.payload;
    yield fork(fetchUser, userId);
    yield fork(fetchUserQuestions, userId, { page: 1, perPage: 10 });
    yield fork(fetchUserComments, userId, { page: 1, perPage: 10 });
  }
}
function* watchGetUserQuestions() {
  while (true) {
    const action: LoadUserQuestions = yield take(LOAD_USER_QUESTIONS);
    yield fork(fetchUserQuestions, action.payload.id, action.payload.query);
  }
}
function* watchGetUserComments() {
  while (true) {
    const action: LoadUserComments = yield take(LOAD_USER_COMMENTS);
    yield fork(fetchUserComments, action.payload.id, action.payload.query);
  }
}
export default function* root() {
  yield all([
    fork(watchGetUser),
    fork(watchGetUserComments),
    fork(watchGetUserQuestions),
  ]);
}
