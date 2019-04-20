import React, { useCallback } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import { ValueType } from 'react-select/lib/types';
import { IOptionValue } from '../../models/select';
import { SelectComponentsProps } from 'react-select/lib/Select';

export interface ITagSelectProps extends SelectComponentsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}
const TagSelect: React.SFC<ITagSelectProps> = ({ tags, setTags, ...props }) => {
  const handleCreate = useCallback((newValue: ValueType<IOptionValue>) => {
    if (!newValue || !Array.isArray(newValue)) {
      return;
    }
    const newTags: string[] = newValue.map(
      (value: IOptionValue) => value.value,
    );
    setTags(newTags);
  }, []);
  return (
    <CreatableSelect
      formatCreateLabel={value => `"${value}" 태그를 생성합니다.`}
      isMulti
      onChange={handleCreate}
      options={[]}
      {...props}
    />
  );
};

export default TagSelect;
