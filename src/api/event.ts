import instance from '.';
import { RunCode, IPostHonor, IHonor } from '../models/event';

export const runCode = async ({ code, language }: RunCode) => {
  const { data } = await instance.post<ApiResponse<string>>('/run', {
    code,
    language,
  });
  return data;
};

export const postHonor = async (honor: IPostHonor) => {
  const { data } = await instance.post<ApiResponse<IHonor>>('/honors', honor);
  return data;
};

export const getHonor = async () => {
  const { data } = await instance.get<ApiGetListResponse<IHonor>>('/honors');
  return data;
};
