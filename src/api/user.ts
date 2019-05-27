import axios from 'axios';
import qs from 'query-string';
import { IUser } from '../models/user';
import { IQuestion } from '../models/question';
import { IComment } from '../models/comment';
import { IBaseListQuery } from '../models/api';

const instance = axios.create({
  baseURL: '/api/users',
});

export const getUser = async (userId: string) => {
  const { data } = await instance.get<ApiResponse<IUser>>(`/${userId}`);
  return data;
};

export const getUserQuestions = async (
  userId: string,
  { page, perPage }: IBaseListQuery = { page: 1, perPage: 10 },
) => {
  const { data } = await instance.get<ApiGetListResponse<IQuestion>>(
    `/${userId}/questions?${qs.stringify({ page, perPage })}`,
  );
  return data;
};

export const getUserComments = async (
  userId: string,
  { page, perPage }: IBaseListQuery = { page: 1, perPage: 10 },
) => {
  const { data } = await instance.get<ApiGetListResponse<IComment>>(
    `/${userId}/comments?${qs.stringify({ page, perPage })}`,
  );
  return data;
};
