export interface IAction {
  type: string;
  isLoading: boolean;
}

export interface ILoadArticlesAction extends IAction {
  articles: IArticle[];
  articlesCount: number;
}

export interface ILoadFullArticleAction extends IAction {
  article: IArticle;
}

export interface IArticle {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  author: IArticleAuthor;
  favoritesCount: number;
}

interface IArticleAuthor {
  username: string;
  image: string;
}
