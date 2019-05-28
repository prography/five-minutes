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
  GET_QUESTION_SUCCESS,
  GET_QUESTION,
  GET_QUESTION_FAILURE,
  ADD_COMMENT,
} from '../constants/ActionTypes';
import { ISearchQuestionQuery } from '../models/api';

export interface IPostQuestionState {
  status: Status;
  question?: IQuestion;
  error: string;
}
export interface IGetQuestionState {
  status: Status;
  error: string;
  question: IQuestion | undefined;
}
export interface IGetQuestionsState {
  status: Status;
  questions: IQuestion[];
  page: number;
  hasNext: boolean;
  error: string;
}
export interface ISearchQuestionsState
  extends ApiGetListResponse<IQuestion>,
    ISearchQuestionQuery {
  status: Status;
  error: string;
}
export interface IQuestionState {
  post: IPostQuestionState;
  get: IGetQuestionState;
  getList: IGetQuestionsState;
  search: ISearchQuestionsState;
}
const initialState: IQuestionState = {
  post: {
    status: 'INIT',
    question: undefined,
    error: '',
  },
  get: {
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
  search: {
    status: 'INIT',
    error: '',
    items: [],
    count: 0,
    page: 0,
    perPage: 0,
    prevPage: '',
    nextPage: '',
    totalCount: 0,
    subject: '',
    language: '',
    tags: [],
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
      case GET_QUESTION: {
        draft.get.status = 'FETCHING';
        return draft;
      }
      case GET_QUESTION_SUCCESS: {
        draft.get.question = action.payload;
        draft.get.status = 'SUCCESS';
        return draft;
      }
      case GET_QUESTION_FAILURE: {
        draft.get.question = undefined;
        draft.get.error = action.payload;
        draft.get.status = 'FAILURE';
        return draft;
      }
      case ADD_COMMENT: {
        if (draft.get.question) {
          draft.get.question.comments.push(action.payload);
        }
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
