import React from 'react';
import styled from 'styled-components';
import { Header, FeedSearch } from '../containers';
import { PageLayout } from '../styles/common';
import * as backgroundImg from '../assets/background.png';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${backgroundImg});
  background-size: 110% 80%;
  background-position: -5px -5px;
  background-repeat: no-repeat;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <PageLayout>
        <FeedSearch />
      </PageLayout>
    </Container>
  );
};

export default Home;
