import { IOptionValue } from '../models/select';

export const makeSelectable = <T = string>(
  items: any[],
  value?: T,
  label = value,
): IOptionValue<T>[] => {
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
