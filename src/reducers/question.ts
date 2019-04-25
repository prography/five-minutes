import produce from 'immer';
import { QuestionAction } from '../actions/question';
import { IQuestion } from '../models/question';
import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
} from '../constants/ActionTypes';

export interface IPostQuestionState {
  status: Status;
  post?: IQuestion;
  error: string;
}
export interface IQuestionState {
  post: IPostQuestionState;
}
const initialState: IQuestionState = {
  post: {
    status: 'INIT',
    post: undefined,
    error: '',
  },
};

export default function reducer(
  state: IQuestionState = initialState,
  action: QuestionAction,
) {
  return produce(state, draft => {
    switch (action.type) {
      case POST_QUESTION: {
        draft.post.status = 'FETCHING';
        return draft;
      }
      case POST_QUESTION_SUCCESS: {
        draft.post.status = 'SUCCESS';
        draft.post.post = action.payload;
        return draft;
      }
      case POST_QUESTION_FAILURE: {
        draft.post.status = 'FAILURE';
        draft.post.error = action.payload;
        return draft;
      }
    }
  });
}
