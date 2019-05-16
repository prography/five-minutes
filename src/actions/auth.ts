import {
  ME,
  ME_FAILURE,
  ME_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from '../constants/ActionTypes';
import { createAsyncActionCreator, ActionTypes } from '../utils/redux';
import { ISigninUser, IUser } from '../models/user';

const meActions = createAsyncActionCreator(ME, ME_SUCCESS, ME_FAILURE)<
  null,
  IUser | null,
  string
>();

export const me = meActions.request;
export type Me = ReturnType<typeof me>;

const signinActions = createAsyncActionCreator(
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
)<ISigninUser, IUser, string>();

export const signin = signinActions.request;
export type Signin = ReturnType<typeof signin>;

export const logout = () => ({
  type: LOGOUT,
});
export type Logout = ReturnType<typeof logout>;

export type AuthAction =
  | ActionTypes<typeof meActions>
  | ActionTypes<typeof signinActions>
  | Logout;
