import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditProfile } from '../containers';
import { IRootState } from '../reducers';
import { MainLayout } from '../styles/common';

const ProfileEdit: React.SFC<RouteComponentProps<{ userId: string }>> = ({ match }) => {
  const { userId } = match.params;
  const me = useSelector((state: IRootState) => state.auth.me.user);
  if (!me || userId != me.id) {
    return null;
  }
  return (
    <MainLayout>
      <EditProfile user={me} />
    </MainLayout>
  )
}

export default ProfileEdit;