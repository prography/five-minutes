import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import authReducer, { IAuthState } from './auth';
import tagReducer, { ITagState } from './tag';
import questionReducer, { IQuestionState } from './question';
import { History } from 'history';

export interface IRootState {
  router: RouterState;
  auth: IAuthState;
  question: IQuestionState;
  tag: ITagState;
}

const rootReducer = (history: History) =>
  combineReducers<IRootState>({
    router: connectRouter(history),
    auth: authReducer,
    question: questionReducer,
    tag: tagReducer,
  });

export default rootReducer;
