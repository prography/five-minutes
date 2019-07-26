import { IUser } from './user';
import { ISchemaBase } from './base';

export type RunnableCode =
  | 'C'
  | 'JAVA'
  | 'Javascript'
  | 'Python'
  | 'Typescript';

export type RunCode = {
  code: string;
  language: RunnableCode;
};
export interface IHonor extends ISchemaBase {
  name: IUser['nickname'];
  mail: IUser['id'];
  agreeReceivingMail: boolean;
  duration: number;
}

export type IPostHonor = Omit<IHonor, keyof ISchemaBase>;
