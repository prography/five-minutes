import React from 'react';
import { Header, FeedSearch } from '../containers';
import { PageLayout } from '../styles/common';

const Home = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <FeedSearch />
      </PageLayout>
    </>
  );
};

export default Home;
