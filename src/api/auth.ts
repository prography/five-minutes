import axios from 'axios';
import { ISignupUser, IUser, ISigninUser } from '../models/user';
import { IQuestion } from '../models/question';
import { IComment } from '../models/comment';

const instance = axios.create({
  baseURL: '/api',
});

export const signup: ApiCall<
  [ISignupUser],
  ApiResponse<IUser>
> = async signupUser => {
  const { data } = await instance.post('/sign-up', signupUser);
  return data;
};

// signin response 타입
export const signin: ApiCall<
  [ISigninUser],
  ApiResponse<IUser>
> = async signinUser => {
  const { data } = await instance.post('/sign-in', signinUser);
  return data;
};
export const me: ApiCall<any, ApiResponse<IUser | null>> = async () => {
  const { data } = await instance.get('/me');
  return data;
};
/* 내 질문 / 답변 */

export const meQuestions: ApiCall<
  any,
  ApiGetListResponse<IQuestion>
> = async () => {
  const { data } = await instance.get(`/me/questions`);
  return data;
};

export const meComments: ApiCall<
  any,
  ApiGetListResponse<IComment>
> = async () => {
  const { data } = await instance.get(`/me/comments`);
  return data;
};
