import React from 'react';
import { Header, FeedSearch } from '../containers';
import { QuestionList } from '../containers/Home';
import { PageLayout } from '../styles/common';

const Home = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <FeedSearch />
        <QuestionList />
      </PageLayout>
    </>
  );
};

export default Home;
