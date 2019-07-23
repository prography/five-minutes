import React from 'react';
import styled from 'styled-components';
import profilephoto from '../assets/ic_profilephoto.png';
import { Link } from 'react-router-dom';

const Photo = styled.img`
  border-radius: 100%;
`;

interface ProfilePhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  userId?: string;
}

const ProfilePhoto: React.SFC<ProfilePhotoProps> = ({
  width = 40,
  src = profilephoto,
  userId,
  ...props
}) => {
  const handleError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = profilephoto;
    (e.target as any).error = null;
  };

  const Image = () => (
    <Photo
      src={src}
      alt="프로필사진"
      width={width}
      height={width}
      {...props}
      onError={handleError}
    />
  )
  if (userId) {
    return (
      <Link to={`/profile/${userId}`}>
        <Image />
      </Link>
    )
  }
  return (
    <Image />
  );
};

export default ProfilePhoto;
