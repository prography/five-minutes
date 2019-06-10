import React from 'react';
import { SearchSidebar, SearchResult } from '../containers';
import { MainLayout, Sidebar, LayoutWithSidebar } from '../styles/common';
import { RouteComponentProps } from 'react-router';

const Search: React.SFC<RouteComponentProps> = props => {
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
