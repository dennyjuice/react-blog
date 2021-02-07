export interface IUser {
  email: string;
  username: string;
  bio: string;
  image: string | null;
  [propName: string]: any;
}

export interface IUserState {
  user: IUser | null;
  isLogged: boolean;
  error: string | null;
}

export enum UserActionTypes {
  LOGIN = 'LOGIN',
}

interface ILoginAction {
  type: UserActionTypes.LOGIN;
  user: IUser;
}

export type IUserAction = ILoginAction;
