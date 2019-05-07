import React from 'react';
import { QuestionList } from '../containers';
import { RouteComponentProps } from 'react-router';

const Home: React.SFC<RouteComponentProps> = ({ history }) => {
  return (
    <>
      <QuestionList loadNew={history.action === 'PUSH'} />
    </>
  );
};

export default Home;
