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
  LOAD_USER,
  LOAD_USER_QUESTIONS,
  LOAD_USER_COMMENTS,
} from '../constants/ActionTypes';
import { createEntity, ActionTypes } from '../utils/redux';
import * as userApi from '../api/user';

export const getUserActions = createEntity(
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
)(userApi.getUser);
export const loadUser = (id: string) => ({ type: LOAD_USER, payload: id });
export type LoadUser = ReturnType<typeof loadUser>;

export const getUserQuestionsActions = createEntity(
  GET_USER_QUESTIONS,
  GET_USER_QUESTIONS_SUCCESS,
  GET_USER_QUESTIONS_FAILURE,
)(userApi.getUserQuestions);
export const loadUserQuestions = (id: string, isInit: boolean) => ({
  type: LOAD_USER_QUESTIONS,
  payload: {
    id,
    isInit,
  },
});
export type LoadUserQuestions = ReturnType<typeof loadUserQuestions>;

export const getUserCommentsActions = createEntity(
  GET_USER_COMMENTS,
  GET_USER_COMMENTS_SUCCESS,
  GET_USER_COMMENTS_FAILURE,
)(userApi.getUserComments);
export const loadUserComments = (id: string, isInit: boolean) => ({
  type: LOAD_USER_COMMENTS,
  payload: {
    id,
    isInit,
  },
});
export type LoadUserComments = ReturnType<typeof loadUserComments>;

export type UserAction =
  | ActionTypes<typeof getUserActions>
  | ActionTypes<typeof getUserQuestionsActions>
  | ActionTypes<typeof getUserCommentsActions>;
