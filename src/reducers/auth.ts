import produce from 'immer';
import { IUser } from '../models/user';
import { AuthAction } from '../actions/auth';
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from '../constants/ActionTypes';

export interface IAuthProfile {
  isLoggedIn: boolean;
  user: IUser;
}
export interface IAuthSignin {
  status: Status;
  error: string;
}
export interface IAuthState {
  profile: IAuthProfile;
  signin: IAuthSignin;
}
const initialState: IAuthState = {
  profile: {
    isLoggedIn: false,
    user: {
      id: '',
      email: '',
      nickname: '',
      rank: '',
      createdAt: new Date(),
      verifiedAt: new Date(),
      token: '',
      githubUrl: '',
      image: '',
      questions: [],
      comments: [],
      tags: [],
      likedQuestions: [],
      likedComments: [],
    },
  },
  signin: {
    status: 'INIT',
    error: '',
  },
};

const authReducer = (
  state: IAuthState = initialState,
  action: AuthAction,
): IAuthState => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGNIN: {
        draft.signin.status = 'FETCHING';
        return draft;
      }
      case SIGNIN_SUCCESS: {
        draft.signin.status = 'SUCCESS';
        draft.profile.isLoggedIn = true;
        draft.profile.user = action.payload;
        return draft;
      }
      case SIGNIN_FAILURE: {
        draft.signin.status = 'FAILURE';
        draft.profile.isLoggedIn = false;
        return draft;
      }
      case LOGOUT: {
        draft = initialState;
        return draft;
      }
    }
  });
};

export default authReducer;
