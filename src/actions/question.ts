import {
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
} from '../constants/ActionTypes';

import { IPostQuestion, IQuestion } from '../models/question';
import {
  ActionTypes,
  createAsyncActionCreator,
  mapActionCreator,
} from '../utils/redux';

const postQuestionActions = createAsyncActionCreator(
  POST_QUESTION,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAILURE,
)<IPostQuestion, IQuestion, string>();

export const postQuestion = postQuestionActions.request;
export type PostQuestion = ReturnType<typeof postQuestion>;

export type QuestionAction = ActionTypes<typeof postQuestionActions>;
