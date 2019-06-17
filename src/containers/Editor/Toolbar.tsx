import React, { memo, useMemo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { TiImageOutline, TiCodeOutline } from 'react-icons/ti';
import { ToolbarContainer, ToolItem } from './styles';
import { CommandType } from '../../models/command';
import selectCommands from '../../constants/command';

const ICONS = {
  codeline: <TiCodeOutline size={20} />,
  image: <TiImageOutline size={20} />,
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
