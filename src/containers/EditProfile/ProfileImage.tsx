import React, { useRef, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import { useImageUploader } from '../../hooks';
import { profileUploader } from '../../utils/cloudinary';
import { IUser } from '../../models/user';
import { ProfilePhoto, ImageUploader } from '../../components';
import { ImageWrapper, ImageEdit } from './style';

interface IProfileImageProps {
  handleUpdateUser: (user: Partial<IUser>) => void;
  image: string;
}

const ProfileImage: React.SFC<IProfileImageProps> = ({ handleUpdateUser, image }) => {
  const uploaderRef = useRef<HTMLInputElement>(null);
  const handleImageFile = useCallback(
    async (err, url?: string) => handleUpdateUser({ image: url }),
    [handleUpdateUser],
  );
  const [openImageUploader, handleImageChange] = useImageUploader(
    uploaderRef,
    profileUploader,
    handleImageFile,
  );
  return (
    <ImageWrapper>
      <ProfilePhoto width={100} src={image} />
      <ImageUploader ref={uploaderRef} onChange={handleImageChange} />
      <ImageEdit onClick={openImageUploader}>
        <CameraIcon fontSize="large" />
      </ImageEdit>
    </ImageWrapper>
  )
}

export default ProfileImage;