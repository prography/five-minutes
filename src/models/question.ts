import { ISchemaBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';
import { ITag } from './tag';

export interface IQuestion extends ISchemaBase {
  content: string;
  subject: string;
  code: string;
  language: string;
  user: IUser;
  likedUsers: IUser[];
  dislikedUsers: IUser[];
  comments: IComment[];
  tags: ITag[];
}

export interface IQuestionLike extends ISchemaBase {
  user: IUser;
  question: IQuestion;
}

export interface IQuestionTag extends ISchemaBase {
  tag: ITag;
  question: IQuestion;
}

/* 등록 등을 위한 서브 타입 */
export type IPostQuestion = Pick<
  IQuestion,
  'content' | 'code' | 'subject' | 'language'
> & {
  tags: string[];
};
