import { ICommand, CommandType } from '../models/command';

const commandsRecord: Record<CommandType, ICommand> = {
  bold: {
    type: 'bold' as const,
    description: '볼드체를 추가합니다',
  },
  italic: {
    type: 'italic' as const,
    description: '이탤릭체를 추가합니다',
  },
  codeline: {
    type: 'codeline' as const,
    description: '코드라인을 선택하여 추가합니다.',
  },
  image: {
    type: 'image' as const,
    description: '이미지를 추가합니다.',
  },
  link: {
    type: 'link' as const,
    description: '링크를 추가합니다.',
  }
};

const selectCommands = (commands: CommandType[]) => {
  return commands.map(command => commandsRecord[command]);
};

export default selectCommands;
