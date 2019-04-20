import { ISchemaBase } from './base';
import { IComment, ICommentLike } from './comment';
import { IQuestion, IQuestionLike } from './question';
import { ITag } from './tag';

export interface IUser extends ISchemaBase {
  email: string;
  nickname: string;
  password: string;
  rank: string;
  verifiedAt: Date;
  token: string;
  githubUrl: string;
  image: string;
  questions: IQuestion[];
  comments: IComment[];
  tags: IUserTag[];
  likedQuestions: IQuestionLike[];
  likedComments: ICommentLike[];
}

export interface IUserTag extends ISchemaBase {
  tag: ITag;
  user: IUser;
}
