export interface IUser extends ISignUpForm {
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

export interface ISignUpForm extends ISignInForm {
  username: string;
  matchingPassword?: string;
  privacy?: boolean;
}

export interface IUpdateProfileForm extends ISignUpForm {
  image?: string;
}

export interface IEditArticleForm {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface IForm {
  user?: ISignUpForm | ISignInForm | IUpdateProfileForm;
  article?: IEditArticleForm;
}

export enum UserEndPoints {
  LOGIN = '/users/login',
  REGISTER = '/users',
  UPDATE = '/user',
}

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  FETCHING = 'FETCHING',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
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
  type: UserActionTypes.FETCH_USER_ERROR;
  error: IError;
}

interface ILogOutAction {
  type: UserActionTypes.LOG_OUT;
}

export type IUserAction = ILoginAction | IFetchingAction | ILogOutAction | IFetchErrorAction;
