import {
  GET_TAGS,
  GET_TAGS_FAILURE,
  GET_TAGS_SUCCESS,
} from '../constants/ActionTypes';
import { ITag } from '../models/tag';
import {
  ActionTypes,
  createAsyncActionCreator,
  mapActionCreator,
} from '../utils/redux';

const getTagsActions = createAsyncActionCreator(
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
)<{ page: number; perPage: number }, ITag[], string>();

export const getTags = getTagsActions.request;
export type GetTags = ReturnType<typeof getTags>;

export type TagAction = ActionTypes<typeof getTagsActions>;
