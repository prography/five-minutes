import instance from '.';
import qs from 'query-string';
import { IQuestion, IPostQuestion } from '../models/question';
import { IBaseListQuery, ISearchQuestionQuery } from '../models/api';
import { IPostComment, IComment } from '../models/comment';

export const getQuestion: ApiCall<
  [number | string],
  ApiResponse<IQuestion>
> = async questionId => {
  const { data } = await instance.get(`/questions/${questionId}`);
  return data;
};
export const getQuestions: ApiCall<
  [IBaseListQuery],
  ApiGetListResponse<IQuestion>
> = async ({ page, perPage }) => {
  const { data } = await instance.get(`/questions/?${qs.stringify({ page, perPage })}`);
  return data;
};
export const postQuestion: ApiCall<
  [IPostQuestion],
  ApiResponse<IQuestion>
> = async post => {
  const { data } = await instance.post('/questions', post);
  return data;
};
export const likeQuestion = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IQuestion>>(`/questions/${id}/like`);
  return data;
};
export const dislikeQuestion = async (id: string) => {
  const { data } = await instance.put<ApiResponse<IQuestion>>(`/questions/${id}/dislike`);
  return data;
};

/* 답변 */

export const postComment: ApiCall<
  [{ questionId: string; comment: IPostComment }],
  ApiResponse<IComment>
> = async ({ questionId, comment }) => {
  const { data } = await instance.post(`/questions/${questionId}/comments`, comment);
  return data;
};

/* 검색 */
export const searchQuestions = async (
  listQuery: IBaseListQuery,
  searchQuery: ISearchQuestionQuery,
) => {
  const { data } = await instance.get<ApiGetListResponse<IQuestion>>(
    `/questions/search?${qs.stringify(
      { ...listQuery, ...searchQuery },
      { arrayFormat: 'bracket' },
    )}`,
  );
  return data;
};
