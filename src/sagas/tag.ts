import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} from '../constants/ActionTypes';
import { GetTags } from '../actions/tag';
import * as tagApi from '../api/tag';

function* getTags(action: GetTags) {
  try {
    const data: SagaEffect<typeof tagApi.getTags> = yield call(tagApi.getTags, {
      ...action,
    });
    yield put({
      type: GET_TAGS_SUCCESS,
      tags: data.items,
    });
  } catch (err) {
    yield put({
      type: GET_TAGS_FAILURE,
      error: 'tag error',
    });
  }
}

function* watchGetTags() {
  yield takeLatest(GET_TAGS, getTags);
}

export default function* root() {
  yield all([fork(watchGetTags)]);
}
