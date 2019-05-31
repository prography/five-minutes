import React, { memo } from 'react';
import { QuestionForm } from '../containers';
import { ErrorBoundary } from '../components';
import { MainLayout } from '../styles/common';

const Ask = () => {
  return (
    <MainLayout>
      <ErrorBoundary>
        <QuestionForm />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default memo(Ask);
