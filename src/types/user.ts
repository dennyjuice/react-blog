export interface IUser {
  email: string;
  username: string;
  bio: string;
  image: string | null;
  [propName: string]: any;
}

export interface IUserState {
  user: IUser | null;
  isFetching: boolean;
  isLogged: boolean;
  error: IError | null;
}

export interface IError {
  email?: string;
  password?: string;
  username?: string;
  [propName: string]: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  matchingPassword?: string;
  privacy?: boolean;
}

export interface IUpdateProfileForm {
  username: string;
  email: string;
  password: string;
  image?: string;
}

export interface ILoginRegister {
  user: ISignUpForm | ISignInForm | IUpdateProfileForm;
}

export enum UserEndPoints {
  LOGIN = '/users/login',
  REGISTER = '/users',
  UPDATE = '/user',
}

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  FETCHING = 'FETCHING',
  FETCH_ERROR = 'FETCH_ERROR',
  LOG_OUT = 'LOG_OUT',
}

interface ILoginAction {
  type: UserActionTypes.LOGIN;
  user: IUser;
}

interface IFetchingAction {
  type: UserActionTypes.FETCHING;
  isFetching: boolean;
}

interface IFetchErrorAction {
  type: UserActionTypes.FETCH_ERROR;
  error: IError;
}

interface ILogOutAction {
  type: UserActionTypes.LOG_OUT;
}

export type IUserAction = ILoginAction | IFetchingAction | ILogOutAction | IFetchErrorAction;
