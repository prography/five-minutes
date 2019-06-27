export type CommandType = 'codeline' | 'image' | 'link' | 'bold' | 'italic';

export interface ICommand {
  type: CommandType;
  description: string;
}
