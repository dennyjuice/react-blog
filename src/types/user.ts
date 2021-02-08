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
  error: string | null;
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

export interface ILoginRegister {
  user: ISignUpForm | ISignInForm;
}

export enum UserEndPoints {
  LOGIN = '/users/login',
  REGISTER = '/users',
  UPDATE = '/user',
}

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  FETCHING = 'FETCHING',
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

interface ILogOutAction {
  type: UserActionTypes.LOG_OUT;
}

export type IUserAction = ILoginAction | IFetchingAction | ILogOutAction;
