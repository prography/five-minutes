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

export const getTagsActions = createAsyncActionCreator(
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
)<{ page: number; perPage: number }, ITag[], string>();

export type GetTags = ReturnType<typeof getTagsActions.request>;

export type TagAction = ActionTypes<typeof getTagsActions>;
