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
} from '../constants/ActionTypes';
import { IComment } from '../models/comment';

import { IPostQuestion, IQuestion } from '../models/question';
import { IBaseListQuery } from '../models/api';
import {
  ActionTypes,
  createActionCreator,
  createAsyncActionCreator,
  mapActionCreator,
} from '../utils/redux';

/* 질문 올리기 */
const postQuestionActions = createAsyncActionCreator(
  POST_QUESTION,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAILURE,
)<IPostQuestion, IQuestion, string>();

export const postQuestion = postQuestionActions.request;
export type PostQuestion = ReturnType<typeof postQuestion>;

/* 질문 리스트 가져오기 */
const getQuestionsActions = createAsyncActionCreator(
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
)<
  IBaseListQuery,
  { items: IQuestion[]; page: number; hasNext: boolean },
  string
>();

export const getQuestions = getQuestionsActions.request;
export type GetQuestions = ReturnType<typeof getQuestions>;

/* 질문 하나 가져오기 */
const getQuestionActions = createAsyncActionCreator(
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
)<number | string, IQuestion, string>();

export const getQuestion = getQuestionActions.request;
export type GetQuestion = ReturnType<typeof getQuestion>;

/* 현재 view question에 comment 추가 */
export const addComment = createActionCreator(ADD_COMMENT)<IComment>();

export type AddComment = ReturnType<typeof addComment>;

export type QuestionAction =
  | ActionTypes<typeof postQuestionActions>
  | ActionTypes<typeof getQuestionsActions>
  | ActionTypes<typeof getQuestionActions>
  | AddComment;
