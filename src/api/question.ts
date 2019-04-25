import axios from 'axios';
import qs from 'query-string';
import { IQuestion, IPostQuestion } from '../models/question';
import { IBaseListQuery } from '../models/api';

const instance = axios.create({
  baseURL: '/api/questions',
});

export const postQuestion: ApiCall<
  IPostQuestion,
  ApiResponse<IQuestion>
> = async post => {
  const { data } = await instance.post('', post);
  return data;
};
