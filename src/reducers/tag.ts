import produce from 'immer';
import {
  GET_TAGS,
  GET_TAGS_FAILURE,
  GET_TAGS_SUCCESS,
} from '../constants/ActionTypes';
import { ITag } from '../models/tag';
import { TagAction } from '../actions/tag';

export interface IGetTagsState {
  status: Status;
  tags: ITag[];
  error: string;
}
export interface ITagState {
  getTags: IGetTagsState;
}

const intialState: ITagState = {
  getTags: {
    status: 'INIT',
    tags: [],
    error: '',
  },
};

const reducer = (state: ITagState = intialState, action: TagAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case GET_TAGS: {
        draft.getTags.status = 'FETCHING';
        return draft;
      }
      case GET_TAGS_SUCCESS: {
        draft.getTags.status = 'SUCCESS';
        draft.getTags.tags = action.tags;
        return draft;
      }
      case GET_TAGS_FAILURE: {
        draft.getTags.status = 'FAILURE';
        draft.getTags.error = action.error;
        return draft;
      }
    }
  });
};

export default reducer;
