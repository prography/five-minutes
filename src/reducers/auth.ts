const initialState: IAuthState = {
  id: '',
};

export interface IAuthState {
  id: string;
}

const authReducer = (
  state: IAuthState = initialState,
  action: any,
): IAuthState => {
  return state;
};

export default authReducer;
