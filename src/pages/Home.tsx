import React from 'react';
import { FeedSearch } from '../containers';
import { QuestionList } from '../containers';
import { PageLayout } from '../styles/common';

const Home = () => {
  return (
    <>
      <PageLayout>
        <FeedSearch />
        <QuestionList />
      </PageLayout>
    </>
  );
};

export default Home;
