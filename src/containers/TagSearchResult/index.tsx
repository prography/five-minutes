import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { questionQueryHelper, history } from '../../utils/history';
import { loadTaggedQuestions } from '../../actions/question';
import { IRootState } from '../../reducers';
import { PaginationList, TagInfo } from '..';
import { LoadingBar, NoResult } from '../../components';
import { RouteComponentProps } from 'react-router';

interface ITagSearchResultProps extends Pick<RouteComponentProps, 'location'> {
  tag: string;
}
const TagSearchResult: React.SFC<ITagSearchResultProps> = ({
  location,
  tag,
}) => {
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);
  useEffect(() => {
    const { page } = questionQueryHelper.searchQuery;
    dispatch(loadTaggedQuestions({ page: parseInt(page, 10) }, tag));
  }, [dispatch, location.search, tag]);

  const handlePageChange = useCallback(
    (page: number) => {
      history.push(
        `${location.pathname}?${questionQueryHelper.mergeQuery({
          page: `${page}`,
        })}`,
      );
    },
    [location.pathname],
  );
  // Ensure component mounted before show spinner
  if (!mounted) return null;
  if (status === 'FETCHING') return <LoadingBar />;
  if (status === 'SUCCESS' && (!items || items.length === 0)) {
    return <NoResult><p>다른 태그를 검색해보세요.</p></NoResult>
  }
  return (
    <div>
      <TagInfo name={tag} count={totalCount} />
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

export default TagSearchResult;
