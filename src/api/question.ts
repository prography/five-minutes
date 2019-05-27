import axios from 'axios';
import qs from 'query-string';
import { IQuestion, IPostQuestion } from '../models/question';
import { IBaseListQuery } from '../models/api';
import { IPostComment, IComment } from '../models/comment';

const instance = axios.create({
  baseURL: '/api/questions',
});

export const getQuestion: ApiCall<
  [number | string],
  ApiResponse<IQuestion>
> = async questionId => {
  const { data } = await instance.get(`/${questionId}`);
  return data;
};
export const getQuestions: ApiCall<
  [IBaseListQuery],
  ApiGetListResponse<IQuestion>
> = async ({ page, perPage }) => {
  const { data } = await instance.get(`?${qs.stringify({ page, perPage })}`);
  return data;
};
export const postQuestion: ApiCall<
  [IPostQuestion],
  ApiResponse<IQuestion>
> = async post => {
  const { data } = await instance.post('', post);
  return data;
};
export const likeQuestion = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IQuestion>>(`/${id}/like`);
  return data;
};
export const dislikeQuestion = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IQuestion>>(`/${id}/dislike`);
  return data;
};

/* 답변 */

export const postComment: ApiCall<
  [{ questionId: string; comment: IPostComment }],
  ApiResponse<IComment>
> = async ({ questionId, comment }) => {
  const { data } = await instance.post(`/${questionId}/comments`, comment);
  return data;
};
