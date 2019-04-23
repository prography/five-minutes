import axios from 'axios';
import qs from 'query-string';
import { ITag } from '../models/tag';
import { IBaseListQuery } from '../models/api';

const instance = axios.create({
  baseURL: '/api/tags',
});

export const getTags = async ({ page, perPage }: IBaseListQuery) => {
  const { data } = await instance.get<ApiGetListResponse<ITag>>(
    `?${qs.stringify({ page, perPage })}`,
  );
  return data;
};

// Tag 검색 api
interface ISearchTagsQuery extends IBaseListQuery {
  name: string;
}

export const searchTags = async ({ page, perPage, name }: ISearchTagsQuery) => {
  const { data } = await instance.get<ApiGetListResponse<ITag>>(
    `/search?${qs.stringify({ page, perPage, name })}`,
  );
  return data;
};
