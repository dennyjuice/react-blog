export interface IArticle {
  title: string;
  slug: string;
  body: string;
  tagList: string[];
  createdAt: string;
  description: string;
  author: IArticleAuthor;
  favoritesCount: number;
  favorited: boolean;
}

interface IArticleAuthor {
  username: string;
  image: string;
}

export interface IArticles {
  articles: IArticle[];
  articlesCount?: number;
}

export interface IArticlesState {
  articles: IArticle[] | null;
  articlesCount: number;
  fullArticle: IArticle | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLiked: boolean;
}

export enum ArticlesActions {
  LOAD_ARTICLES = 'LOAD_ARTICLES',
  LOAD_FULL_ARTICLE = 'LOAD_FULL_ARTICLE',
  FETCHING = 'FETCHING',
  FETCH_ERROR = 'FETCH_ERROR',
  SUCCESS_CREATE = 'SUCCESS_CREATE',
  SUCCESS_LIKE = 'SUCCESS_LIKE',
}

interface ILoadArticlesAction {
  type: ArticlesActions.LOAD_ARTICLES;
  articles: IArticles;
}

interface ILoadFullArticleAction {
  type: ArticlesActions.LOAD_FULL_ARTICLE;
  article: IArticle;
}

interface IFetchingAction {
  type: ArticlesActions.FETCHING;
  isLoading: boolean;
}

interface IFetchErrorAction {
  type: ArticlesActions.FETCH_ERROR;
}

interface ISuccessCreate {
  type: ArticlesActions.SUCCESS_CREATE;
  isSuccess: boolean;
}

interface ISuccessLike {
  type: ArticlesActions.SUCCESS_LIKE;
  isLiked: boolean;
}

export type IArticlesAction =
  | ILoadArticlesAction
  | ILoadFullArticleAction
  | IFetchingAction
  | IFetchErrorAction
  | ISuccessCreate
  | ISuccessLike;
