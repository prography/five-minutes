import React from 'react';
import { MainLayout } from '../styles/common';
import { QuestionList } from '../containers';
import { RouteComponentProps } from 'react-router';

const Home: React.SFC<RouteComponentProps> = ({ history }) => {
  return (
    <MainLayout>
      <QuestionList loadNew={history.action === 'PUSH'} />
    </MainLayout>
  );
};

export default Home;
