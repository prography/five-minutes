import produce from 'immer';
import { IUser } from '../models/user';
import { AuthAction } from '../actions/auth';
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  ME,
  ME_SUCCESS,
  ME_FAILURE,
} from '../constants/ActionTypes';

export interface IAuthMe {
  status: Status;
  error: string;
  isLoggedIn: boolean;
  user: IUser;
}
export interface IAuthSignin {
  status: Status;
  error: string;
}
export interface IAuthState {
  me: IAuthMe;
  signin: IAuthSignin;
}
const initialState: IAuthState = {
  me: {
    status: 'INIT',
    error: '',
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
      case ME: {
        draft.me.status = 'FETCHING';
        return draft;
      }
      case ME_SUCCESS: {
        draft.me.status = 'SUCCESS';
        if (action.payload) {
          // verify 성공하여 유저 정보 받아온 경우
          draft.me.isLoggedIn = true;
          draft.me.user = action.payload;
        }
        return draft;
      }
      case ME_FAILURE: {
        draft.me.status = 'FAILURE';
        draft.me.error = action.payload;
        draft.me.user = initialState.me.user;
        return draft;
      }
      case SIGNIN: {
        draft.signin.status = 'FETCHING';
        return draft;
      }
      case SIGNIN_SUCCESS: {
        draft.signin.status = 'SUCCESS';
        draft.me.isLoggedIn = true;
        draft.me.user = action.payload;
        return draft;
      }
      case SIGNIN_FAILURE: {
        draft.signin.status = 'FAILURE';
        draft.me.isLoggedIn = false;
        return draft;
      }
      case LOGOUT: {
        draft.me.isLoggedIn = false;
        draft.me.user = initialState.me.user;
        return draft;
      }
    }
  });
};

export default authReducer;
