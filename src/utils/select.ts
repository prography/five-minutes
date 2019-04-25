import { IOptionValue } from '../models/select';

export const makeSelectable = (
  items: any[],
  value?: string,
  label = value,
): IOptionValue[] => {
  const selectable = items.map(item => {
    if (value && label) {
      return {
        value: item[value],
        label: item[label],
      };
    }
    return {
      value: item,
      label: item,
    };
  });
  return selectable;
};
