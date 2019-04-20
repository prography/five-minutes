import { ISchemaBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';
import { ITag } from './tag';

export interface IQuestion extends ISchemaBase {
  content: string;
  subject: string;
  code: string;
  user: IUser;
  likedUsers: IQuestionLike[];
  comments: IComment[];
  tags: IQuestionTag[];
}

export interface IQuestionLike extends ISchemaBase {
  user: IUser;
  question: IQuestion;
}

export interface IQuestionTag extends ISchemaBase {
  tag: ITag;
  question: IQuestion;
}
