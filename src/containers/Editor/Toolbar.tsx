import React, { memo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CodeIcon from '@material-ui/icons/Code';
import { ToolbarContainer, ToolItem } from './styles';
import { ICommand, CommandType } from '../../models/command';

const ICONS = {
  codeline: <CodeIcon />,
};

interface IToolbarProps {
  commands: ICommand[];
  execCommand: (command: CommandType) => void;
}
const Toolbar: React.SFC<IToolbarProps> = ({ commands, execCommand }) => {
  return (
    <ToolbarContainer>
      {commands.map(({ type, description }) => (
        <Tooltip key={type} title={description} aria-label="type">
          <ToolItem onClick={() => execCommand(type)}>{ICONS[type]}</ToolItem>
        </Tooltip>
      ))}
    </ToolbarContainer>
  );
};

export default memo(Toolbar);
