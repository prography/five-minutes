import axios from 'axios';
import { ISignupUser, IUser, ISigninUser } from '../models/user';

const instance = axios.create({
  baseURL: '/api',
});

export const signup: ApiCall<
  ISignupUser,
  ApiResponse<IUser>
> = async signupUser => {
  const { data } = await instance.post('/sign-up', signupUser);
  return data;
};

// signin response 타입
export const signin: ApiCall<ISigninUser, any> = async signinUser => {
  const { data } = await instance.post('/sign-in', signinUser);
  return data;
};
