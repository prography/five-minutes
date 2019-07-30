import React, { memo, useMemo, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { MdFormatBold, MdFormatItalic, MdCode, MdImage, MdLink } from 'react-icons/md';
import { ToolbarContainer, ToolItem } from './styles';
import { CommandType } from '../../models/command';
import selectCommands from '../../constants/command';
import { KEYMAP } from '../../utils/keyboard';

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
  editor?: HTMLInputElement | HTMLTextAreaElement | null;
}
const Toolbar: React.SFC<IToolbarProps> = ({ editor, commandTypes, execCommand }) => {
  useEffect(() => {
    let handler: EventListener | undefined = undefined;
    if (editor) {
      handler = (e) => {
        const el = (e as KeyboardEvent);
        if (el.ctrlKey) {
          switch (KEYMAP[el.keyCode]) {
            case 'B': {
              el.preventDefault();
              execCommand('bold');
              break;
            }
            case 'I': {
              el.preventDefault();
              execCommand('italic');
              break;
            }
          }
        }
      }
      editor.addEventListener('keydown', handler, { capture: true });
    }
    return handler && editor ? editor.removeEventListener('keydown', handler) : () => { };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [editor]);
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
