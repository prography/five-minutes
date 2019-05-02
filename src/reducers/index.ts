import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import tagReducer, { ITagState } from './tag';
import questionReducer, { IQuestionState } from './question';

export interface IRootState {
  auth: IAuthState;
  question: IQuestionState;
  tag: ITagState;
}

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  question: questionReducer,
  tag: tagReducer,
});

export default rootReducer;
