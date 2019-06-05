import React, { memo, useMemo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ImageIcon from '@material-ui/icons/Image';
import CodeIcon from '@material-ui/icons/Code';
import { ToolbarContainer, ToolItem } from './styles';
import { CommandType } from '../../models/command';
import selectCommands from '../../constants/command';

const ICONS = {
  codeline: <CodeIcon />,
  image: <ImageIcon />,
};

interface IToolbarProps {
  commandTypes: CommandType[];
  execCommand: (command: CommandType) => void;
}
const Toolbar: React.SFC<IToolbarProps> = ({ commandTypes, execCommand }) => {
  const commands = useMemo(() => selectCommands(commandTypes), [commandTypes]);
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
