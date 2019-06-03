export type CommandType = 'codeline' | 'image';

export interface ICommand {
  type: CommandType;
  description: string;
}
