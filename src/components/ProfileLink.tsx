import React from 'react';
import { IUser } from '../models/user';
import { CustomLink } from '.';

interface IProfileLinkProps extends Pick<IUser, 'id'> {
  children?: React.ReactNode;
}
const ProfileLink: React.SFC<IProfileLinkProps> = ({ id, children }) => (
  <CustomLink to={`/profile/${id}`}>{children}</CustomLink>
);

export default ProfileLink;
