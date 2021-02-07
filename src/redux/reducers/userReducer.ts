import { IUserAction, IUserState, UserActionTypes } from '../../types/user';

const defaultState: IUserState = {
  user: null,
  isFetching: false,
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
    case UserActionTypes.FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export default userReducer;
