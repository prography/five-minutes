import React from 'react';
import profilephoto from '../assets/ic_profilephoto.png';

const ProfilePhoto: React.SFC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  width = 28,
  ...props
}) => {
  return <img {...props} src={profilephoto} alt="프로필사진" width={width} />;
};

export default ProfilePhoto;
