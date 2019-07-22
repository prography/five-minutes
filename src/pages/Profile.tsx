import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { UserProfile } from '../containers';
import { MainLayout } from '../styles/common';
import { loadUser } from '../actions/user';

export interface IProfileProps
  extends RouteComponentProps<{ userId: string }> { }

const Profile: React.SFC<IProfileProps> = ({ location, match }) => {
  const { userId } = match.params;
  const { tab } = queryString.parse(location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser(userId));
  }, [userId, dispatch]);
  return (
    <MainLayout>
      <UserProfile currentTab={typeof tab === 'string' ? tab : 'Questions'} currentPath={location.pathname} />
    </MainLayout>
  );
};

export default Profile;
