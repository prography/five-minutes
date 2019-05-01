import React from 'react';
import { QuestionForm } from '../containers';
import { ErrorBoundary } from '../components';

const Ask = () => {
  return (
    <>
      <ErrorBoundary>
        <QuestionForm />
      </ErrorBoundary>
    </>
  );
};

export default Ask;
