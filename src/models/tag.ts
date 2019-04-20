import { ISchemaBase } from './base';
import { IQuestionTag } from './question';
import { IUserTag } from './user';

export interface ITag extends ISchemaBase {
  name: string;
  description: string;
  taggedQuestions: IQuestionTag[];
  taggedUsers: IUserTag[];
}
