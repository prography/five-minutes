import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { TagSearchResult } from '../containers';
import { MainLayout } from '../styles/common';

interface Param {
  tag: string;
}

const TagSearch: SFC<RouteComponentProps<Param>> = ({ location, match }) => {
  const { tag } = match.params;

  if (!tag) {
    return <div>태그 목록</div>;
  }
  return (
    <MainLayout>
      <TagSearchResult tag={tag} location={location} />
    </MainLayout>
  );
};

export default TagSearch;
