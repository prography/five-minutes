import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_SUCCESS,
} from '../constants/ActionTypes';

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
const getQuestionActions = createAsyncActionCreator(
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
)<
  IBaseListQuery,
  { items: IQuestion[]; page: number; hasNext: boolean },
  string
>();

export const getQuestions = getQuestionActions.request;
export type GetQuestions = ReturnType<typeof getQuestions>;

export type QuestionAction =
  | ActionTypes<typeof postQuestionActions>
  | ActionTypes<typeof getQuestionActions>;
