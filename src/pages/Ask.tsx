import React from 'react';
import { PageLayout } from '../styles/common';
import { QuestionForm } from '../containers/Ask';
import { Header } from '../containers';

const Ask = () => {
  return (
    <>
      <Header withSearch />
      <PageLayout>
        <QuestionForm />
      </PageLayout>
    </>
  );
};

export default Ask;
