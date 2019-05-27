import React from 'react';
import { useSelector } from 'react-redux';
import { useMe } from '../../hooks';
import { IRootState } from '../../reducers';

const Info = () => {
  const { user, status, error } = useSelector((state: IRootState) => {
    const { user, status, error } = state.user.get;
    return { user, status, error };
  });
  if (!user) return null;
  const { nickname, image } = user;
  return <div>{nickname}</div>;
};

export default Info;
