import instance from '.';
import { IComment } from '../models/comment';

export const likeComment = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IComment>>(`/comments/${id}/like`);
  return data;
};

export const dislikeComment = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IComment>>(`/comments/${id}/dislike`);
  return data;
};
