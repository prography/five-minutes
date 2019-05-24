import React from 'react';
import { useMe } from '../../hooks';

const Info = () => {
  const userInfo = useMe(['nickname', 'image']);
  if (!userInfo) {
    return null;
  }
  const { nickname, image } = userInfo;
  return <div>{nickname}</div>;
};

export default Info;
