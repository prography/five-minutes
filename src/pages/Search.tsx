import React from 'react';
import { SearchSidebar, SearchResult } from '../containers';
import { MainLayout, Sidebar, LayoutWithSidebar } from '../styles/common';

const Search = () => {
  return (
    <LayoutWithSidebar>
      <Sidebar />
      <MainLayout>
        <SearchResult />
      </MainLayout>
      <Sidebar>
        <SearchSidebar />
      </Sidebar>
    </LayoutWithSidebar>
  );
};

export default Search;
