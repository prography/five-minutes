import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} from '../constants/ActionTypes';
import { GetTags, getTagsActions } from '../actions/tag';
import * as tagApi from '../api/tag';

function* getTags(action: GetTags) {
  try {
    const { items }: SagaEffect<typeof tagApi.getTags> = yield call(
      tagApi.getTags,
      {
        ...action.payload,
      },
    );
    yield put(getTagsActions.success(items));
  } catch ({ response = {} }) {
    yield put(getTagsActions.failure(response.message));
  }
}

function* watchGetTags() {
  yield takeLatest(GET_TAGS, getTags);
}

export default function* root() {
  yield all([fork(watchGetTags)]);
}
