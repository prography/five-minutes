import produce from 'immer';
import { IUser } from '../models/user';
import { UserAction } from '../actions/user';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_QUESTIONS,
  GET_USER_QUESTIONS_SUCCESS,
  GET_USER_QUESTIONS_FAILURE,
  GET_USER_COMMENTS,
  GET_USER_COMMENTS_SUCCESS,
  GET_USER_COMMENTS_FAILURE,
} from '../constants/ActionTypes';
import { IQuestion } from '../models/question';
import { IComment } from '../models/comment';

export interface IGetUser {
  status: Status;
  error: string;
  user?: IUser;
}
export interface IGetQuestions extends ApiGetListResponse<IQuestion> {
  status: Status;
  error: string;
}
export interface IGetComments extends ApiGetListResponse<IComment> {
  status: Status;
  error: string;
}

export interface IUserState {
  get: IGetUser;
  questions: IGetQuestions;
  comments: IGetComments;
}

const initialState: IUserState = {
  get: {
    status: 'INIT',
    error: '',
    user: undefined,
  },
  questions: {
    status: 'INIT',
    error: '',
    page: 1,
    perPage: 10,
    count: 0,
    totalCount: 0,
    prevPage: '',
    nextPage: '',
    items: [],
  },
  comments: {
    status: 'INIT',
    error: '',
    page: 1,
    perPage: 10,
    count: 0,
    totalCount: 0,
    prevPage: '',
    nextPage: '',
    items: [],
  },
};

export default function reducer(
  state: IUserState = initialState,
  action: UserAction,
) {
  return produce(state, draft => {
    switch (action.type) {
      case GET_USER: {
        draft.get.status = 'FETCHING';
        return draft;
      }
      case GET_USER_SUCCESS: {
        draft.get.status = 'SUCCESS';
        draft.get.user = action.payload.result;
        return draft;
      }
      case GET_USER_FAILURE: {
        draft.get.status = 'FAILURE';
        draft.get.user = undefined;
        draft.get.error = action.payload;
        return draft;
      }
      case GET_USER_QUESTIONS: {
        draft.questions.status = 'FETCHING';
        return draft;
      }
      case GET_USER_QUESTIONS_SUCCESS: {
        draft.questions = {
          ...draft.questions,
          ...action.payload,
          status: 'SUCCESS',
        };
        return draft;
      }
      case GET_USER_QUESTIONS_FAILURE: {
        draft.questions.status = 'FAILURE';
        draft.questions.error = action.payload;
        return draft;
      }
      case GET_USER_COMMENTS: {
        draft.comments.status = 'FETCHING';
        return draft;
      }
      case GET_USER_COMMENTS_SUCCESS: {
        draft.comments = {
          ...draft.comments,
          ...action.payload,
          status: 'SUCCESS',
        };
        return draft;
      }
      case GET_USER_COMMENTS_FAILURE: {
        draft.comments.status = 'FAILURE';
        draft.comments.error = action.payload;
        return draft;
      }
    }
  });
}
