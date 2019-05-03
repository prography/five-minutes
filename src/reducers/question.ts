import produce from 'immer';
import { QuestionAction } from '../actions/question';
import { IQuestion } from '../models/question';
import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_SUCCESS,
} from '../constants/ActionTypes';

export interface IPostQuestionState {
  status: Status;
  question?: IQuestion;
  error: string;
}
export interface IGetQuestionsState {
  status: Status;
  questions: IQuestion[];
  page: number;
  hasNext: boolean;
  error: string;
}
export interface IQuestionState {
  post: IPostQuestionState;
  getList: IGetQuestionsState;
}
const initialState: IQuestionState = {
  post: {
    status: 'INIT',
    question: undefined,
    error: '',
  },
  getList: {
    status: 'INIT',
    questions: [],
    page: 0,
    hasNext: true,
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
        draft.post.question = action.payload;
        // 새 question 추가시 리스트에도 추가. empty 아닐때만
        if (draft.getList.questions.length > 0) {
          draft.getList.questions.unshift(action.payload);
        }
        return draft;
      }
      case POST_QUESTION_FAILURE: {
        draft.post.status = 'FAILURE';
        draft.post.error = action.payload;
        return draft;
      }
      case GET_QUESTIONS: {
        draft.getList.status = 'FETCHING';
        return draft;
      }
      case GET_QUESTIONS_SUCCESS: {
        draft.getList.status = 'SUCCESS';
        draft.getList.questions = action.payload.items;
        draft.getList.page = action.payload.page;
        draft.getList.hasNext = action.payload.hasNext;
        return draft;
      }
      case GET_QUESTIONS_FAILURE: {
        draft.getList.status = 'FAILURE';
        draft.getList.error = action.payload;
        return draft;
      }
    }
  });
}
