import { MODE_INFO } from '../constants/codemirror';

export const getModeNames = () => MODE_INFO.map(info => info.name);
export const getModeInfoByName = (name: string) => {
  return MODE_INFO.find(info => info.name.toLowerCase() === name.toLowerCase());
};
