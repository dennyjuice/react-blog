import { ILoginRegister, IUser, UserActionTypes, UserEndPoints } from '../../types/user';
import { authService, getUser } from '../../services';

export const login = (user: IUser) => ({
  type: UserActionTypes.LOGIN,
  user,
});

export const fetching = (isFetching: boolean) => ({
  type: UserActionTypes.FETCHING,
  isFetching,
});

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT,
});

export const loginUser = (body: ILoginRegister) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await authService(body, UserEndPoints.LOGIN);
  localStorage.setItem('token', JSON.stringify(data.user.token));
  dispatch(login(data));
  dispatch(fetching(false));
};

export const registerUser = (body: ILoginRegister) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await authService(body, UserEndPoints.REGISTER);
  localStorage.setItem('token', JSON.stringify(data.user.token));
  dispatch(login(data));
  dispatch(fetching(false));
};

export const getCurrentUser = () => async (dispatch: Function) => {
  const token = localStorage.getItem('token');
  if (token) {
    const data = await getUser(token, UserEndPoints.UPDATE);
    dispatch(login(data));
  }
};
