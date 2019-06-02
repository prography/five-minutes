import React, { useEffect, useCallback, useState } from 'react';
import { questionQueryHelper, history } from '../../utils/history';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSearchedQuestions,
  updateListQuery,
  updateSearchQuery,
} from '../../actions/question';
import { IRootState } from '../../reducers';
import { QuestionListItem } from '..';
import { Pagination } from '../../components';
import { IQuestion } from '../../models/question';

const SearchResult = () => {
  const { page, ...searchQuery } = questionQueryHelper.searchQuery;
  const dispatch = useDispatch();
  const { status, perPage, items, totalCount } = useSelector(
    (state: IRootState) => ({
      perPage: state.question.search.perPage,
      status: state.question.search.status,
      items: state.question.search.items,
      totalCount: state.question.search.totalCount,
    }),
  );
  useEffect(() => {
    dispatch(loadSearchedQuestions({ page: parseInt(page, 10) }, searchQuery));
  }, [history.location.search]);

  const handlePageChange = useCallback((page: number) => {
    history.push(
      `/search?${questionQueryHelper.mergeQuery({ page: `${page}` })}`,
    );
  }, []);

  if (status === 'FETCHING') return <div>loading...</div>;
  return (
    <div>
      {items.map(item => (
        <QuestionListItem key={item.id} {...item} />
      ))}
      <Pagination
        initialPage={parseInt(page, 10)}
        perPage={perPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResult;
