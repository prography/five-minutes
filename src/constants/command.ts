import { ICommand, CommandType } from '../models/command';

const commandsRecord: Record<CommandType, ICommand> = {
  codeline: {
    type: 'codeline' as const,
    description: '코드라인을 선택하여 추가합니다.',
  },
  image: {
    type: 'image' as const,
    description: '이미지를 추가합니다.',
  },
};

const selectCommands = (commands: CommandType[]) => {
  return commands.map(command => commandsRecord[command]);
};

export default selectCommands;
