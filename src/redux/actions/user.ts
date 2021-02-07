import { ILoginRegister, IUser, UserActionTypes, UserEndPoints } from '../../types/user';
import { authService } from '../../services';

export const login = (user: IUser) => ({
  type: UserActionTypes.LOGIN,
  user,
});

export const fetching = (isFetching: boolean) => ({
  type: UserActionTypes.FETCHING,
  isFetching,
});

export const loginUser = (body: ILoginRegister) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await authService(body, UserEndPoints.LOGIN);
  dispatch(login(data));
  dispatch(fetching(false));
};

export const registerUser = (body: ILoginRegister) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await authService(body, UserEndPoints.REGISTER);
  dispatch(login(data));
  dispatch(fetching(false));
};
