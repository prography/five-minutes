import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { UserProfile } from '../containers';
import { PageLayout, ShadowBox } from '../styles/common';

export interface IProfileProps
  extends RouteComponentProps<{ nickname: string }> {}

const Profile: React.SFC<IProfileProps> = ({ location, match }) => {
  const { nickname } = match.params;
  const { tab } = queryString.parse(location.search);
  return (
    <>
      <ShadowBox>
        <UserProfile currentTab={typeof tab === 'string' ? tab : 'Questions'} />
      </ShadowBox>
    </>
  );
};

export default Profile;
