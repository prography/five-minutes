import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Tags from './Tags';
import { WatchedTags } from '../../';
import { IRootState } from '../../../reducers';

const Info = () => {
  const { user, status, error, myId } = useSelector((state: IRootState) => ({
    user: state.user.get.user,
    status: state.user.get.status,
    error: state.user.get.error,
    myId: state.auth.me.user.id,
  }));
  if (!user || status === 'FETCHING') return null;
  const isMe = myId === user.id;
  const { nickname, image, tags } = user;
  return (
    <div>
      <div>{nickname}</div>
      <div>{isMe ? <WatchedTags /> : <Tags tags={tags} />}</div>
    </div>
  );
};

export default Info;
