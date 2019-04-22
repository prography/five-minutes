import axios, { AxiosResponse } from 'axios';
import qs from 'query-string';
import { ITag } from '../models/tag';

const instance = axios.create({
  baseURL: '/api/tags',
});

export const getTags = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const { data } = await instance.get<ApiGetListResponse<ITag>>(
    `?${qs.stringify({ page, perPage })}`,
  );
  return data;
};
