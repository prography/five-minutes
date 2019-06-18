import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import questionReducer, { IQuestionState } from './question';
import modalReducer, { IModalState } from './modal';
import userReducer, { IUserState } from './user';
export interface IRootState {
  auth: IAuthState;
  question: IQuestionState;
  modal: IModalState;
  user: IUserState;
}

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  question: questionReducer,
  modal: modalReducer,
  user: userReducer,
});

export default rootReducer;
