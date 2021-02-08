import { IError, ILoginRegister, IUser, UserActionTypes, UserEndPoints } from '../../types/user';
import { authService, getCurrentUser, updateUser } from '../../services';

export const login = (user: IUser) => ({
  type: UserActionTypes.LOGIN,
  user,
});

export const fetching = (isFetching: boolean) => ({
  type: UserActionTypes.FETCHING,
  isFetching,
});

export const fetchError = (error: IError) => ({
  type: UserActionTypes.FETCH_ERROR,
  error,
});

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT,
});

export const loginUser = (body: ILoginRegister) => async (dispatch: Function) => {
  try {
    dispatch(fetching(true));
    const data = await authService(body, UserEndPoints.LOGIN);
    localStorage.setItem('token', JSON.stringify(data.user.token));
    dispatch(login(data));
  } catch (error) {
    dispatch(fetchError(error.response.data.errors));
  } finally {
    dispatch(fetching(false));
  }
};

export const registerUser = (body: ILoginRegister) => async (dispatch: Function) => {
  try {
    dispatch(fetching(true));
    const data = await authService(body, UserEndPoints.REGISTER);
    localStorage.setItem('token', JSON.stringify(data.user.token));
    dispatch(login(data));
  } catch (error) {
    dispatch(fetchError(error.response.data.errors));
  } finally {
    dispatch(fetching(false));
  }
};

export const getProfile = () => async (dispatch: Function) => {
  const token = localStorage.getItem('token');
  if (token) {
    const data = await getCurrentUser(token, UserEndPoints.UPDATE);
    dispatch(login(data));
  }
};

export const updateProfile = (body: ILoginRegister) => async (dispatch: Function) => {
  try {
    dispatch(fetching(true));
    const token = localStorage.getItem('token');
    const data = await updateUser(body, token, UserEndPoints.UPDATE);
    dispatch(login(data));
  } catch (error) {
    dispatch(fetchError(error.response.data.errors));
  } finally {
    dispatch(fetching(false));
  }
};
