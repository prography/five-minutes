import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
  ADD_COMMENT,
  SEARCH_QUESTIONS,
  SEARCH_QUESTIONS_SUCCESS,
  SEARCH_QUESTIONS_FAILURE,
  LOAD_SEARCHED_QUESTIONS,
  SET_QUESTION_SEARCH_MODE,
} from '../constants/ActionTypes';
import { IComment } from '../models/comment';

import { IPostQuestion, IQuestion } from '../models/question';
import { IBaseListQuery, ISearchQuestionQuery } from '../models/api';
import {
  ActionTypes,
  createEntity,
  createActionCreator,
  createAsyncActionCreator,
} from '../utils/redux';
import * as questionApi from '../api/question';

/* 질문 올리기 */
export const postQuestionActions = createAsyncActionCreator(
  POST_QUESTION,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAILURE,
)<IPostQuestion, IQuestion, string>();
export type PostQuestion = ReturnType<typeof postQuestionActions.request>;

/* 질문 리스트 가져오기 */
export const getQuestionsActions = createAsyncActionCreator(
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
)<
  IBaseListQuery,
  { items: IQuestion[]; page: number; hasNext: boolean },
  string
>();
export type GetQuestions = ReturnType<typeof getQuestionsActions.request>;

/* 질문 하나 가져오기 */
export const getQuestionActions = createAsyncActionCreator(
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
)<number | string, IQuestion, string>();
export type GetQuestion = ReturnType<typeof getQuestionActions.request>;

/* 현재 view question에 comment 추가 */
export const addComment = createActionCreator(ADD_COMMENT)<IComment>();

export type AddComment = ReturnType<typeof addComment>;

/* 질문 검색 */

export const searchQuestionsActions = createEntity(
  SEARCH_QUESTIONS,
  SEARCH_QUESTIONS_SUCCESS,
  SEARCH_QUESTIONS_FAILURE,
)(questionApi.searchQuestions);
export const loadSearchedQuestions = (
  listQuery: Partial<IBaseListQuery>,
  searchQuery?: ISearchQuestionQuery,
) => ({
  type: LOAD_SEARCHED_QUESTIONS,
  payload: {
    listQuery: {
      page: 1,
      perPage: 10,
      ...listQuery,
    },
    searchQuery,
  },
});

export const setQuestionSearchMode = (isTagSearch: boolean) => ({
  type: SET_QUESTION_SEARCH_MODE,
  payload: isTagSearch,
});

export type RequestSearchQuestions = {
  type: typeof LOAD_SEARCHED_QUESTIONS;
  payload: {
    listQuery: Partial<IBaseListQuery>;
    searchQuery?: ISearchQuestionQuery;
  };
};

export type QuestionAction =
  | ActionTypes<typeof postQuestionActions>
  | ActionTypes<typeof getQuestionsActions>
  | ActionTypes<typeof getQuestionActions>
  | ActionTypes<typeof searchQuestionsActions>
  | ReturnType<typeof setQuestionSearchMode>
  | AddComment;
