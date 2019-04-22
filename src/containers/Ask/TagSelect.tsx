import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import { ValueType } from 'react-select/lib/types';
import { SelectComponentsProps } from 'react-select/lib/Select';
import { connect } from 'react-redux';
import { IOptionValue } from '../../models/select';
import { makeSelectable } from '../../utils/select';

import * as tagAction from '../../actions/tag';
import { IRootState } from '../../reducers';
import { IGetTagsState } from '../../reducers/tag';
export interface ITagSelectProps extends SelectComponentsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  getTags: typeof tagAction.getTags;
  getTagsState: IGetTagsState;
}
const TagSelect: React.SFC<ITagSelectProps> = ({
  tags,
  setTags,
  getTags,
  getTagsState,
  ...props
}) => {
  const handleCreate = useCallback((newValue: ValueType<IOptionValue>) => {
    if (!newValue || !Array.isArray(newValue)) {
      return;
    }
    const newTags: string[] = newValue.map(
      (value: IOptionValue) => value.value,
    );
    setTags(newTags);
  }, []);
  const handleInputChange = useCallback((newValue: string) => {
    if (!newValue || newValue.length < 2) {
      return;
    }
    //TODO: tag 검색어에 따라 태그 가져오기
    getTags({ page: 1, perPage: 10 });
  }, []);

  const options = useMemo(() => {
    return makeSelectable(getTagsState.tags, 'name');
  }, [getTagsState.tags]);

  /* Tag 로딩 api 직접 호출해야하나 ? */
  const resolveRef = useRef<typeof Promise.resolve | null>(null);
  const loadOptions = useCallback((inputValue: string) => {
    return new Promise<void>(res => {
      resolveRef.current = res as typeof Promise.resolve;
      getTags({ page: 1, perPage: 10 });
    });
  }, []);
  useEffect(() => {
    if (resolveRef.current && getTagsState.status === 'SUCCESS') {
      resolveRef.current(makeSelectable(getTagsState.tags, 'name'));
      resolveRef.current = null;
    }
  }, [getTagsState.status]);
  return (
    <AsyncCreatableSelect
      isMulti
      cacheOptions
      defaultOptions
      onChange={handleCreate}
      loadOptions={loadOptions}
      {...props}
    />
  );
};

const mapStateToProps = (state: IRootState) => ({
  getTagsState: state.tag.getTags,
});
export default connect(
  mapStateToProps,
  {
    getTags: tagAction.getTags,
  },
)(TagSelect);
