export type CommandType = 'codeline';

export interface ICommand {
  type: CommandType;
  description: string;
}
