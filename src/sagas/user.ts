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
function* fetchUserQuestions(id: string, isInit: boolean) {
  // isInit 이거나 다음페이지가 있으면 call
  const { hasNext, page, perPage } = yield select((state: IRootState) => ({
    hasNext: !!state.user.questions.nextPage,
    page: state.user.questions.page + 1,
    perPage: state.user.questions.perPage,
  }));
  if (hasNext || isInit) {
    const query = isInit ? { page: 1, perPage: 10 } : { page, perPage };
    yield call(fetchGetUserQuestions, id, query);
  }
}
function* fetchUserComments(id: string, isInit: boolean) {
  const { hasNext, page, perPage } = yield select((state: IRootState) => ({
    hasNext: !!state.user.comments.nextPage,
    page: state.user.comments.page + 1,
    perPage: state.user.comments.perPage,
  }));
  if (hasNext || isInit) {
    const query = isInit ? { page: 1, perPage: 10 } : { page, perPage };
    yield call(fetchGetUserComments, id, query);
  }
}
function* watchGetUser() {
  while (true) {
    const action: LoadUser = yield take(LOAD_USER);
    const userId = action.payload;
    yield fork(fetchUser, userId);
    yield fork(fetchUserQuestions, userId, true);
    yield fork(fetchUserComments, userId, true);
  }
}
function* watchGetUserQuestions() {
  while (true) {
    const action: LoadUserQuestions = yield take(LOAD_USER_QUESTIONS);
    yield fork(fetchUserQuestions, action.payload.id, action.payload.isInit);
  }
}
function* watchGetUserComments() {
  while (true) {
    const action: LoadUserComments = yield take(LOAD_USER_COMMENTS);
    yield fork(fetchUserComments, action.payload.id, action.payload.isInit);
  }
}
export default function* root() {
  yield all([
    fork(watchGetUser),
    fork(watchGetUserComments),
    fork(watchGetUserQuestions),
  ]);
}
