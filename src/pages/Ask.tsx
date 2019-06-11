import React, { memo } from 'react';
import { AskQuestion } from '../containers';
import { ErrorBoundary } from '../components';
import { MainLayout } from '../styles/common';

const Ask = () => {
  return (
    <MainLayout>
      <ErrorBoundary>
        <AskQuestion />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default memo(Ask);
