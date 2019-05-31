import React from 'react';
import { SearchSidebar, SearchResult } from '../containers';
import { MainLayout, RightSidebar } from '../styles/common';

const Search = () => {
  return (
    <>
      <MainLayout>
        <SearchResult />
      </MainLayout>
      <RightSidebar>
        <SearchSidebar />
      </RightSidebar>
    </>
  );
};

export default Search;
