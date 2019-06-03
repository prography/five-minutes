import axios from 'axios';
import qs from 'query-string';
import { IUser } from '../models/user';
import { IQuestion } from '../models/question';
import { IComment } from '../models/comment';
import { IBaseListQuery } from '../models/api';
import { ITag } from '../models/tag';

const instance = axios.create({
  baseURL: '/api/users',
});

export const getUser = async (userId: string) => {
  const { data } = await instance.get<ApiResponse<IUser>>(`/${userId}`);
  return data;
};

export const updateUser = async (
  userId: string,
  updateUser: Partial<IUser>,
) => {
  const { data } = await instance.put<ApiResponse<IUser>>(
    `/${userId}`,
    updateUser,
  );
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

export const addTag = async (userId: string, tag: string) => {
  const { data } = await instance.put<ApiResponse<{ user: IUser }>>(
    `/${userId}/tags/add`,
    { tag },
  );
  return data;
};

export const removeTag = async (userId: string, tag: string) => {
  const { data } = await instance.put<ApiResponse<{ user: IUser }>>(
    `/${userId}/tags/remove`,
    { tag },
  );
  return data;
};
