import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from '../constants/ActionTypes';
import { createAsyncActionCreator, ActionTypes } from '../utils/redux';
import { ISigninUser, IUser } from '../models/user';

const signinActions = createAsyncActionCreator(
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
)<ISigninUser, IUser, { error: string }>();

export const signin = signinActions.request;
export type Signin = ReturnType<typeof signin>;

export const logout = () => ({
  type: LOGOUT,
});
export type Logout = ReturnType<typeof logout>;

export type AuthAction = ActionTypes<typeof signinActions> | Logout;
