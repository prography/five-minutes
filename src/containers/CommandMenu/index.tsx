import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { KEYMAP } from '../../utils/keyboard';
import { Commands } from './style';
import { useWindowEvent, usePrevious } from '../../hooks';
import { ICommand, CommandType } from '../../models/command';

// slash 후 match commands가 MAX_ATTEMPT 이후로도 0면 커맨드를 종료한다.
const MAX_ATTEMPT = 5;
export interface ICommandProps {
  command: string;
  commands: ICommand[];
  clearCommand: () => void;
  execCommand: (command: CommandType) => void;
}
const CommandMenu: React.SFC<ICommandProps> = ({
  command,
  commands,
  clearCommand,
  execCommand,
}) => {
  // 슬래쉬 다음 input 값에 대해 regex로 필터링
  const matchCommands = useMemo(() => {
    return commands.filter(({ type }) => {
      try {
        const isMatch = new RegExp('^' + command, 'g').test(type);
        return isMatch;
      } catch (err) {
        return false;
      }
    });
  }, [command]);
  // 현재 focus 중인 index
  const [commandIndex, setCommandIndex] = useState(0);
  // prev command값 저장 (MAX_ATTEMT 비교)
  const prevCommand = usePrevious(command);

  // MAX_ATTEMPT 이상 결과 없는 command input 시 종료 (input이 추가되었을 때만)
  const attemptRef = useRef(0);
  useEffect(() => {
    if (matchCommands.length === 0 && command.length > prevCommand.length) {
      attemptRef.current++;
    } else {
      attemptRef.current = Math.max(attemptRef.current - 1, 0);
    }
  }, [command]);

  // 종료 조건 확인
  useEffect(() => {
    if (attemptRef.current > MAX_ATTEMPT) {
      clearCommand();
    }
  }, [attemptRef.current, clearCommand]);

  // Enter 키 및 TODO: 방향키
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (KEYMAP[e.keyCode] === 'ENTER') {
        e.preventDefault();
        if (matchCommands.length > 0) {
          execCommand(matchCommands[commandIndex].type);
        } else {
          clearCommand();
        }
      }
    },
    [execCommand, matchCommands, commandIndex, clearCommand],
  );
  useWindowEvent('keydown', handleKeydown);
  return (
    <Commands>
      {matchCommands.length > 0 ? (
        <List>
          {matchCommands.map(({ type, description }) => (
            <ListItem
              key={type}
              selected={commandIndex === 0}
              onClick={() => execCommand(type)}
            >
              <ListItemText primary={type} secondary={description} />
            </ListItem>
          ))}
        </List>
      ) : (
        <span>결과가 없습니다.</span>
      )}
    </Commands>
  );
};

export default CommandMenu;
