import { ISchemaBase } from './base';
import { IQuestion } from './question';
import { IUser } from './user';

export type CommentStatus = 'WAIT' | 'RESOLVE';

export interface IComment extends ISchemaBase {
  content: string;
  question: IQuestion;
  user: IUser;
  status: CommentStatus;
  codeline: number;
  likedUsers: IUser[];
  dislikedUsers: IUser[];
}

export interface ICommentLike extends ISchemaBase {
  user: IUser;
  comment: IComment;
}

export type IPostComment = Pick<IComment, 'content' | 'codeline'>;
