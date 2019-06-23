import React, { useCallback, useMemo, useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { ValueType } from 'react-select/lib/types';
import { SelectComponentsProps } from 'react-select/lib/Select';
import debounce from 'lodash/debounce';
import { IOptionValue } from '../models/select';
import { makeSelectable } from '../utils/select';
import { searchTags } from '../api/tag';
export interface ITagSelectProps extends SelectComponentsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}
const TagSelect: React.SFC<ITagSelectProps> = ({ tags, setTags, ...props }) => {
  const [defaultValue] = useState(() => makeSelectable(tags));
  const handleCreate = useCallback(
    (newValue: ValueType<IOptionValue>) => {
      if (!newValue || !Array.isArray(newValue)) {
        return;
      }
      const newTags: string[] = newValue.map(
        (value: IOptionValue) => value.value,
      );
      setTags(newTags);
    },
    [setTags],
  );
  // tag 찾는 api를 호출하는 함수
  const searchOptions = useCallback(
    async (inputValue: string, callback: (options: IOptionValue[]) => void) => {
      try {
        if (inputValue.length > 1) {
          const { items } = await searchTags({
            page: 1,
            perPage: 100,
            name: inputValue,
          });
          callback(makeSelectable(items, 'name'));
        }
      } catch (err) {
        callback([]);
      }
    },
    [],
  );
  // 함수형에서 debounce를 걸때는 유의하자.
  const debouncedSearch = useMemo(() => debounce(searchOptions, 500), [
    searchOptions,
  ]);
  // 이런식으로 이 함수를 따로 빼줘야 되는데 왜그럴까?
  const loadOptions = useCallback(
    (inputValue: string, callback: (options: IOptionValue[]) => void) => {
      if (inputValue.length <= 1) {
        return callback([]);
      }
      debouncedSearch(inputValue, callback);
    },
    [debouncedSearch],
  );

  // 태그 생성시 라벨
  const formatCreateLabel = useCallback((input: string) => {
    return `"${input}" 태그를 생성합니다.`;
  }, []);
  // 로딩 메시지
  const loadingMessage = useCallback(() => {
    return '검색 중...';
  }, []);
  // 불일치 메시지
  const noOptionsMessage = useCallback(() => {
    return '해당하는 태그가 없습니다.';
  }, []);
  return (
    <AsyncCreatableSelect
      isMulti
      placeholder="태그를 검색해보세요."
      cacheOptions
      defaultValue={defaultValue}
      defaultOptions={[]}
      onChange={handleCreate}
      loadOptions={loadOptions}
      loadingMessage={loadingMessage}
      noOptionsMessage={noOptionsMessage}
      formatCreateLabel={formatCreateLabel}
      {...props}
    />
  );
};

export default TagSelect;
