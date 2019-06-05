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
import { CommandType } from '../../models/command';
import selectCommands from '../../constants/command';

// slash 후 match commands가 MAX_ATTEMPT 이후로도 0면 커맨드를 종료한다.
const MAX_ATTEMPT = 5;
export interface ICommandProps {
  command: string;
  commandTypes: CommandType[];
  clearCommand: () => void;
  execCommand: (command: CommandType) => void;
}
const CommandMenu: React.SFC<ICommandProps> = ({
  command,
  commandTypes,
  clearCommand,
  execCommand,
}) => {
  const commands = useMemo(() => selectCommands(commandTypes), [commandTypes]);
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
  }, [command, commands]);
  // 현재 focus 중인 index
  const [commandIndex, setCommandIndex] = useState(0);

  // matchCommand의 길이가 바뀌면 0으로 초기화
  useEffect(() => {
    setCommandIndex(0);
  }, [matchCommands.length]);

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
  }, [command, prevCommand.length, matchCommands.length]);

  // 종료 조건 확인
  useEffect(() => {
    if (attemptRef.current > MAX_ATTEMPT) {
      clearCommand();
    }
  }, [clearCommand]);

  // Enter 키 및 TODO: 방향키
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (KEYMAP[e.keyCode]) {
        case 'ENTER': {
          e.preventDefault();
          if (matchCommands.length > 0) {
            execCommand(matchCommands[commandIndex].type);
          } else {
            clearCommand();
          }
          break;
        }
        case 'UP': {
          e.preventDefault();
          setCommandIndex(prev => Math.abs(prev - 1) % matchCommands.length);
          break;
        }
        case 'DOWN': {
          e.preventDefault();
          setCommandIndex(prev => (prev + 1) % matchCommands.length);
          break;
        }
        default: {
          return;
        }
      }
    },
    [execCommand, matchCommands, commandIndex, clearCommand],
  );
  useWindowEvent('keydown', handleKeydown);
  return (
    <Commands>
      <List>
        {matchCommands.length > 0 ? (
          <>
            {matchCommands.map(({ type, description }, index) => (
              <ListItem
                key={type}
                selected={commandIndex === index}
                onClick={() => execCommand(type)}
              >
                <ListItemText primary={type} secondary={description} />
              </ListItem>
            ))}
          </>
        ) : (
          <ListItem>결과가 없습니다.</ListItem>
        )}
      </List>
    </Commands>
  );
};

export default CommandMenu;
