import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { WatchedTags } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionSearchMode } from '../../actions/question';
import { IRootState } from '../../reducers';
import { WatchedWrapper } from './style';

const Search = () => {
  const isTagSearch = useSelector(
    (state: IRootState) => state.question.search.isTagSearch,
  );
  const dispatch = useDispatch();
  const setTagSearchMode = useCallback(
    () => dispatch(setQuestionSearchMode(true)),
    [dispatch],
  );
  const setAllSearchMode = useCallback(
    () => dispatch(setQuestionSearchMode(false)),
    [dispatch],
  );
  return (
    <>
      <div>
        <WatchedWrapper active={isTagSearch}>
          <WatchedTags />
        </WatchedWrapper>
        {isTagSearch ? (
          <Button onClick={setAllSearchMode}>전체 검색</Button>
        ) : (
          <Button onClick={setTagSearchMode}>관심태그 검색</Button>
        )}
      </div>
    </>
  );
};

export default Search;
