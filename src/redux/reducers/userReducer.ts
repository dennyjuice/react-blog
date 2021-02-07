import { IUserAction, IUserState, UserActionTypes } from '../../types/user';

const defaultState: IUserState = {
  user: null,
  isLogged: false,
  error: '',
};

const userReducer = (state = defaultState, action: IUserAction): IUserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        ...action.user,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default userReducer;
