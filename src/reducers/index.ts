import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import tagReducer, { ITagState } from './tag';
import questionReducer, { IQuestionState } from './question';
import modalReducer, { IModalState } from './modal';
export interface IRootState {
  auth: IAuthState;
  question: IQuestionState;
  tag: ITagState;
  modal: IModalState;
}

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  question: questionReducer,
  tag: tagReducer,
  modal: modalReducer,
});

export default rootReducer;
