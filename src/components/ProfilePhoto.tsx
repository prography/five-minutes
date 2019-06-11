import React from 'react';
import styled from 'styled-components';
import profilephoto from '../assets/ic_profilephoto.png';

const Photo = styled.img`
  border-radius: 100%;
`;

const ProfilePhoto: React.SFC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  width = 36,
  src = profilephoto,
  ...props
}) => {
  const handleError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = profilephoto;
    (e.target as any).error = null;
  };
  return (
    <Photo
      src={src}
      alt="프로필사진"
      width={width}
      height={width}
      {...props}
      onError={handleError}
    />
  );
};

export default ProfilePhoto;
