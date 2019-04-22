import { combineReducers } from 'redux';
import authReducer, { IAuthState } from './auth';
import tagReducer, { ITagState } from './tag';

export interface IRootState {
  auth: IAuthState;
  tag: ITagState;
}
const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  tag: tagReducer,
});

export default rootReducer;
