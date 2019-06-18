import { MODE_INFO } from '../constants/codemirror';

export const getModeNames = () => MODE_INFO.map(info => info.name);
export const getModeInfoByName = (name: string) => {
  const lowerName = name.toLocaleLowerCase();
  return MODE_INFO.find(info => {
    return info.name.toLocaleLowerCase() === lowerName;
  });
};
export const getModeInfoByMime = (mime: string) => {
  return MODE_INFO.find(info => {
    if (info.mime && info.mime === mime) return true;
    if (info.mimes && info.mimes.some(item => item === mime)) return true;
    return false;
  })
}