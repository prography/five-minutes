import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DesktopSearch from './Desktop';
import MobileSearch from './Mobile';
import { history, questionQueryHelper } from '../../utils/history';

interface ISearchProps extends RouteComponentProps {
  isMobile: boolean;
}

const Search: React.SFC<ISearchProps> = ({
  location,
  isMobile,
}) => {
  const [search, setSearch] = useState(
    questionQueryHelper.searchQuery.subject || '',
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(
      `/search?${questionQueryHelper.makeQuery({ subject: search })}`,
    );
  };

  useEffect(() => {
    setSearch(questionQueryHelper.searchQuery.subject || '');
  }, [location.search]);

  const ResponsiveSearch = useMemo(() => { return isMobile ? MobileSearch : DesktopSearch }, [isMobile]);
  return (
    <ResponsiveSearch value={search} onChange={handleChange} handleSubmit={handleSearch} />
  )
};

export default withRouter(Search);
