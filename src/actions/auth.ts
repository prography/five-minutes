import * as ActionTypes from '../constants/ActionTypes';

export const init = () => {
  return {
    type: ActionTypes.INIT_ACTION,
  } as const;
};

export type IInitAction = ReturnType<typeof init>;

export type AuthAction = IInitAction;
