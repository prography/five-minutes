import { ISchemaBase } from './base';
import { IComment, ICommentLike } from './comment';
import { IQuestion, IQuestionLike } from './question';
import { ITag } from './tag';

interface IPrivateInfo {
  password: string;
}
export interface IUser extends ISchemaBase {
  email: string;
  nickname: string;
  rank: string;
  verifiedAt: Date;
  token: string;
  githubUrl: string;
  image: string;
  questions: IQuestion[];
  comments: IComment[];
  tags: ITag[];
  likedQuestions: IQuestionLike[];
  likedComments: ICommentLike[];
}
export type ISigninUser = Pick<IUser, 'email'> & IPrivateInfo;
export type ISignupUser = Pick<IUser, 'email' | 'nickname' | 'githubUrl'> & {
  passwordConfirmation: string;
} & IPrivateInfo;
export type IUpdateUser = Partial<Omit<IUser, 'tags'>> & { tags?: string[] };
export interface IUserTag extends ISchemaBase {
  tag: ITag;
  user: IUser;
}
