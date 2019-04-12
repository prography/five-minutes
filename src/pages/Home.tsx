import React from 'react';
import styled from 'styled-components';
import { Header, FeedSearch } from '../containers';
import { WithBackground, PageLayout } from '../styles/common';

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
