import instance from '.';
import qs from 'query-string';
import { ITag } from '../models/tag';
import { IBaseListQuery } from '../models/api';


export const getTags: ApiCall<
  [IBaseListQuery],
  ApiGetListResponse<ITag>
> = async ({ page, perPage }) => {
  const { data } = await instance.get(`/tags/?${qs.stringify({ page, perPage })}`);
  return data;
};

// Tag 검색 api
interface ISearchTagsQuery extends IBaseListQuery {
  name: string;
}

export const searchTags: ApiCall<
  [ISearchTagsQuery],
  ApiGetListResponse<ITag>
> = async ({ page, perPage, name }) => {
  const { data } = await instance.get(
    `/tags/search?${qs.stringify({ page, perPage, name })}`,
  );
  return data;
};
