export interface IState {
  articles: ILoadArticlesAction;
  userState: IUserState;
}

export interface IAction {
  type: string;
  [propName: string]: any;
}

// Articles interfaces
export interface IArticle {
  title: string;
  slug: string;
  body: string;
  tagList: string[];
  createdAt: string;
  description: string;
  author: IArticleAuthor;
  favoritesCount: number;
}

interface IArticleAuthor {
  username: string;
  image: string;
}

export interface IArticleState {
  articles: ILoadArticlesAction;
}

export interface ILoadArticlesAction extends IAction {
  articles: IArticle[];
  articlesCount: number;
}

export interface ILoadFullArticleAction extends IAction {
  fullArticle: IArticle;
}

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

// User interfaces
export interface IUserState {
  email: string;
  username: string;
  bio: string;
  image: string | null;
  isLogged: boolean;
}
