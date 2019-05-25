import axios from 'axios';
import { IComment } from '../models/comment';

const instance = axios.create({
  baseURL: '/api/comments',
});

export const likeComment = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IComment>>(`/${id}/like`);
  return data;
};

export const dislikeComment = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IComment>>(`/${id}/dislike`);
  return data;
};
