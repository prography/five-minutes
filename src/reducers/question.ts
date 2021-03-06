import produce from 'immer';
import { QuestionAction } from '../actions/question';
import { IQuestion, IQuestionListItem } from '../models/question';
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
  SEARCH_QUESTIONS,
  SEARCH_QUESTIONS_SUCCESS,
  SEARCH_QUESTIONS_FAILURE,
  LOAD_TAGGED_QUESTIONS,
  SET_QUESTION_SEARCH_MODE,
  UPDATE_QUESTION,
  UPDATE_COMMENT,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_FAILURE,
} from '../constants/ActionTypes';
import { ISearchQuestionQuery } from '../models/api';

export interface IPostQuestionState {
  status: Status;
  question?: IQuestion;
  error: string;
}
export interface IDeleteQuestionState {
  status: Status;
  error: string;
}
export interface IGetQuestionState {
  status: Status;
  error: string;
  question: IQuestion | undefined;
}
export interface IGetQuestionsState {
  status: Status;
  questions: IQuestionListItem[];
  page: number;
  hasNext: boolean;
  error: string;
}
export interface ISearchQuestionsState
  extends ApiGetListResponse<IQuestionListItem> {
  status: Status;
  error: string;
  isTagSearch: boolean;
  tagged: string;
  searchQuery: ISearchQuestionQuery;
}
export interface IQuestionState {
  post: IPostQuestionState;
  delete: IDeleteQuestionState;
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
  delete: {
    status: 'INIT',
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
    isTagSearch: false,
    tagged: '',
    searchQuery: {
      subject: '',
      tags: [],
      language: '',
    },
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
          draft.getList.questions.unshift({
            ...action.payload,
            comments_count: 0,
          });
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
      case UPDATE_COMMENT: {
        if (!draft.get.question) return draft;

        const targetIdx = draft.get.question.comments.findIndex(
          comment => comment.id === action.payload.id,
        );
        if (targetIdx >= 0) {
          draft.get.question.comments[targetIdx] = {
            ...draft.get.question.comments[targetIdx],
            ...action.payload,
          };
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
      case UPDATE_QUESTION: {
        if (draft.get.question && draft.get.question.id === action.payload.id) {
          draft.get.question = {
            ...draft.get.question,
            ...action.payload,
          };
        }
        return draft;
      }
      case DELETE_QUESTION_REQUEST: {
        draft.delete.status = 'FETCHING';
        return draft;
      }
      case DELETE_QUESTION_SUCCESS: {
        draft.delete.status = 'SUCCESS';
        if (draft.get.question && draft.get.question.id === action.payload) {
          draft.get.question = undefined;
        }
        draft.getList.questions = draft.getList.questions.filter(
          question => question.id !== action.payload,
        );
        return draft;
      }
      case DELETE_QUESTION_FAILURE: {
        draft.delete.status = 'FAILURE';
        return draft;
      }
      case SEARCH_QUESTIONS: {
        const [listQuery, searchQuery] = action.payload;
        draft.search = {
          ...state.search,
          ...listQuery,
          searchQuery: searchQuery,
          status: 'FETCHING',
        };
        return draft;
      }
      case SEARCH_QUESTIONS_SUCCESS: {
        draft.search = {
          ...draft.search,
          ...action.payload,
          count: action.payload.count || 0,
          totalCount: action.payload.totalCount || 0,
          status: 'SUCCESS',
          error: '',
        };
        return draft;
      }
      case SEARCH_QUESTIONS_FAILURE: {
        draft.search = {
          ...initialState.search,
          status: 'FAILURE',
          error: action.payload,
        };
        return draft;
      }
      case LOAD_TAGGED_QUESTIONS: {
        draft.search.tagged = action.payload.tag || '';
        return draft;
      }
      case SET_QUESTION_SEARCH_MODE: {
        draft.search.isTagSearch = action.payload;
        return draft;
      }
    }
  });
}
