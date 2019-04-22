import { IOptionValue } from '../models/select';

export const makeSelectable = (
  items: any[],
  value: string,
  label = value,
): IOptionValue[] => {
  const selectable = items.map(items => ({
    value: items[value],
    label: items[label],
  }));
  return selectable;
};
