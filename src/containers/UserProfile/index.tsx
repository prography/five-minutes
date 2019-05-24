import React from 'react';
import Info from './Info';
import Contents from './Contents';
import { Divider } from '../../components';

interface IProfileProps {
  currentTab: string;
}
const Profile: React.SFC<IProfileProps> = ({ currentTab }) => {
  return (
    <div>
      <Info />
      <Divider withMargin />
      <Contents currentTab={currentTab} />
    </div>
  );
};

export default Profile;
