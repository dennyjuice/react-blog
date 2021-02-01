export interface IArticle {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  description: string;
  author: IArticleAuthor;
  favoritesCount: number;
}

interface IArticleAuthor {
  username: string;
  image: string;
}

export interface IAction {
  type: string;
  [propName: string]: any;
}

export interface ILoadArticlesAction extends IAction {
  articles: IArticle[];
  articlesCount: number;
}

export interface ILoadFullArticleAction extends IAction {
  fullArticle: IArticle;
}
