import {
  ME,
  ME_FAILURE,
  ME_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  SET_WATCHED_TAGS,
  SET_USER_PROFILE,
} from '../constants/ActionTypes';
import { createAsyncActionCreator, ActionTypes } from '../utils/redux';
import { ISigninUser, IUser } from '../models/user';
import { ITag } from '../models/tag';

export const meActions = createAsyncActionCreator(ME, ME_SUCCESS, ME_FAILURE)<
  null,
  IUser | null,
  string
>();
export type Me = ReturnType<typeof meActions.request>;

export const signinActions = createAsyncActionCreator(
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
)<ISigninUser, IUser, string>();
export type Signin = ReturnType<typeof signinActions.request>;

export const setWatchedTags = (tags: ITag[]) => ({
  type: SET_WATCHED_TAGS,
  payload: tags,
});
export type SetWatchedTags = ReturnType<typeof setWatchedTags>;

export const setUserProfile = (user: Partial<IUser>) => ({
  type: SET_USER_PROFILE,
  payload: user,
});

export type SetUserProfile = ReturnType<typeof setUserProfile>;

export const logout = () => ({
  type: LOGOUT,
});
export type Logout = ReturnType<typeof logout>;

export type AuthAction =
  | ActionTypes<typeof meActions>
  | ActionTypes<typeof signinActions>
  | SetWatchedTags
  | SetUserProfile
  | Logout;
