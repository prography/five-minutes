import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import tagReducer, { ITagState } from './tag';
import questionReducer, { IQuestionState } from './question';
import modalReducer, { IModalState } from './modal';
import userReducer, { IUserState } from './user';
export interface IRootState {
  auth: IAuthState;
  question: IQuestionState;
  tag: ITagState;
  modal: IModalState;
  user: IUserState;
}

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  question: questionReducer,
  tag: tagReducer,
  modal: modalReducer,
  user: userReducer,
});

export default rootReducer;
