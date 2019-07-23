import React, { useContext, useMemo } from 'react';
import ViewportContext from '../context/ViewportChecker';
import { Divider } from '../components';
import { SearchSidebar, SearchResult, WatchedTags } from '../containers';
import { MainLayout, Sidebar, LayoutWithSidebar } from '../styles/common';
import { RouteComponentProps } from 'react-router';

const Search: React.SFC<RouteComponentProps> = props => {
  const viewport = useContext(ViewportContext);
  const isMobile = useMemo(() => viewport !== 'laptop', [viewport]);
  if (isMobile) {
    return (
      <MainLayout>
        <div>
          <WatchedTags />
        </div>
        <Divider withMargin />
        <div>
          <SearchResult {...props} />
        </div>
      </MainLayout>
    )
  }
  return (
    <LayoutWithSidebar>
      <Sidebar left />
      <MainLayout>
        <SearchResult {...props} />
      </MainLayout>
      <Sidebar>
        <SearchSidebar />
      </Sidebar>
    </LayoutWithSidebar>
  );
};

export default Search;
