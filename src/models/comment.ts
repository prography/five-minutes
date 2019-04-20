import { ISchemaBase } from './base';
import { IQuestion } from './question';
import { IUser } from './user';

export interface IComment extends ISchemaBase {
  content: string;
  question: IQuestion;
  user: IUser;
  codeline: number;
  likedUsers: ICommentLike[];
}

export interface ICommentLike extends ISchemaBase {
  user: IUser;
  comment: IComment;
}
