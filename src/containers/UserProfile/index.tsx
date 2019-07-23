import React from 'react';
import Info from './Info';
import Contents from './Contents';

interface IProfileProps {
  currentPath: string;
  currentTab: string;
}
const Profile: React.SFC<IProfileProps> = ({ currentTab, currentPath }) => {
  return (
    <div>
      <Info currentPath={currentPath} />
      <Contents currentTab={currentTab} />
    </div>
  );
};

export default Profile;
