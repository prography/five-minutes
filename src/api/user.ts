import instance from '.';
import qs from 'query-string';
import { IUser, IUpdateUser } from '../models/user';
import { IQuestion } from '../models/question';
import { IComment } from '../models/comment';
import { IBaseListQuery } from '../models/api';


export const getUser = async (userId: string) => {
  const { data } = await instance.get<ApiResponse<IUser>>(`/users/${userId}`);
  return data;
};

export const updateUser = async (
  userId: string,
  updateUser: IUpdateUser,
) => {
  const { data } = await instance.put<ApiResponse<IUser>>(
    `/users/${userId}`,
    updateUser,
  );
  return data;
};

export const getUserQuestions = async (
  userId: string,
  { page, perPage }: IBaseListQuery = { page: 1, perPage: 10 },
) => {
  const { data } = await instance.get<ApiGetListResponse<IQuestion>>(
    `/users/${userId}/questions?${qs.stringify({ page, perPage })}`,
  );
  return data;
};

export const getUserComments = async (
  userId: string,
  { page, perPage }: IBaseListQuery = { page: 1, perPage: 10 },
) => {
  const { data } = await instance.get<ApiGetListResponse<IComment>>(
    `/users/${userId}/comments?${qs.stringify({ page, perPage })}`,
  );
  return data;
};

export const addTag = async (userId: string, tag: string) => {
  const { data } = await instance.put<ApiResponse<{ user: IUser }>>(
    `/users/${userId}/tags/add`,
    { tag },
  );
  return data;
};

export const removeTag = async (userId: string, tag: string) => {
  const { data } = await instance.put<ApiResponse<{ user: IUser }>>(
    `/users/${userId}/tags/remove`,
    { tag },
  );
  return data;
};
