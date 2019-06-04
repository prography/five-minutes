import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionQueryHelper } from '../../utils/history';
import { loadSearchedQuestions } from '../../actions/question';
import { IRootState } from '../../reducers';
import { QuestionListItem } from '..';
import { Pagination, LoadingBar } from '../../components';
import { RouteComponentProps } from 'react-router';

const SearchResult: React.SFC<RouteComponentProps> = ({
  history,
  location,
}) => {
  const { page } = questionQueryHelper.searchQuery;
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
    const { page, ...searchQuery } = questionQueryHelper.searchQuery;
    dispatch(loadSearchedQuestions({ page: parseInt(page, 10) }, searchQuery));
  }, [dispatch, location.search]);

  const handlePageChange = useCallback(
    (page: number) => {
      history.push(
        `/search?${questionQueryHelper.mergeQuery({ page: `${page}` })}`,
      );
    },
    [history],
  );

  if (status === 'FETCHING') return <LoadingBar />;
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
