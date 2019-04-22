import {
  GET_TAGS,
  GET_TAGS_FAILURE,
  GET_TAGS_SUCCESS,
} from '../constants/ActionTypes';
import { ITag } from '../models/tag';

export const getTags = ({ page = 1, perPage = 10 }) => {
  return {
    type: GET_TAGS,
    page,
    perPage,
  } as const;
};

export type GetTagsSuccess = { type: typeof GET_TAGS_SUCCESS; tags: ITag[] };
export type GetTagsFailure = { type: typeof GET_TAGS_FAILURE; error: string };
export type GetTags = ReturnType<typeof getTags>;

export type TagAction = GetTags | GetTagsSuccess | GetTagsFailure;
