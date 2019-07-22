import React from 'react';
import Info from './Info';
import Contents from './Contents';
import { Divider } from '../../components';

interface IProfileProps {
  currentPath: string;
  currentTab: string;
}
const Profile: React.SFC<IProfileProps> = ({ currentTab, currentPath }) => {
  return (
    <div>
      <Info currentPath={currentPath} />
      <Divider withMargin />
      <Contents currentTab={currentTab} />
    </div>
  );
};

export default Profile;
