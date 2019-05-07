import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Commands } from './style';
import { useWindowEvent } from '../../hooks';

export interface ICommandProps {
  command: string;
  execCommand: (command: string) => void;
}
const CommandMenu: React.SFC<ICommandProps> = ({ command, execCommand }) => {
  const [commandIndex, setCommandIndex] = useState(0);
  useWindowEvent('keydown', (e) => {
    if (e.keyCode === 13) {
      execCommand('code');
    }
    if (e.keyCode === 38) {

    }
  });
  return (
    <Commands>
      <MenuItem selected={commandIndex === 0} onClick={() => execCommand('code')}>code line</MenuItem>
    </Commands>
  )
}

export default CommandMenu;