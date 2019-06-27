import React, { memo, useMemo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { MdFormatBold, MdFormatItalic, MdCode, MdImage, MdLink } from 'react-icons/md';
import { ToolbarContainer, ToolItem } from './styles';
import { CommandType } from '../../models/command';
import selectCommands from '../../constants/command';

const ICONS = {
  bold: <MdFormatBold size={20} />,
  italic: <MdFormatItalic size={20} />,
  codeline: <MdCode size={20} />,
  image: <MdImage size={20} />,
  link: <MdLink size={20} />
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
