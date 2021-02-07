// Forms
export interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  matchingPassword: string;
  privacy: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}
