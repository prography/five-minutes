import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { questionQueryHelper, history } from '../../utils/history';
import { loadSearchedQuestions } from '../../actions/question';
import { IRootState } from '../../reducers';
import { PaginationList } from '..';
import { LoadingBar, NoResult } from '../../components';
import { RouteComponentProps } from 'react-router';

const SearchResult: React.SFC<RouteComponentProps> = ({ location }) => {
  const { page } = questionQueryHelper.searchQuery;
  const dispatch = useDispatch();
  const { status, perPage, items, totalCount } = useSelector(
    (state: IRootState) => ({
      perPage: state.question.search.perPage,
      status: state.question.search.status,
      items: state.question.search.items,
      totalCount: state.question.search.totalCount,
    }),
    isEqual,
  );
  useEffect(() => {
    const { page, ...searchQuery } = questionQueryHelper.searchQuery;
    dispatch(loadSearchedQuestions({ page: parseInt(page, 10) }, searchQuery));
  }, [dispatch, location.search]);

  const handlePageChange = useCallback((page: number) => {
    history.push(
      `/search?${questionQueryHelper.mergeQuery({ page: `${page}` })}`,
    );
  }, []);
  if (status === 'SUCCESS' && (!items || items.length === 0))
    return (
      <NoResult header="검색 결과가 없습니다.">
        <p>검색어 또는 관심태그를 수정해주세요.</p>
      </NoResult>
    );
  if (status === 'FETCHING') return <LoadingBar />;
  return (
    <div>
      <PaginationList
        page={parseInt(page, 10)}
        perPage={perPage}
        items={items}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResult;
