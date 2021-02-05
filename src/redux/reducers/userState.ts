import { IAction, IUserState } from '../../helpers/types';

const defaultState = {
  email: '',
  username: '',
  bio: '',
  image: '',
  isLogged: false,
};

const userState = (state: IUserState = defaultState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.user,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default userState;
