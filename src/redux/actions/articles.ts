import { fetchData } from '../../services';

import { IArticle, ArticlesActions, IArticles } from '../../types/articles';

export const loadArticles = (articles: IArticles) => ({
  type: ArticlesActions.LOAD_ARTICLES,
  articles,
});

export const loadFullArticle = (article: IArticle) => ({
  type: ArticlesActions.LOAD_FULL_ARTICLE,
  article,
});

export const fetching = (isLoading: boolean) => ({
  type: ArticlesActions.FETCHING,
  isLoading,
});

export const fetchArticlesError = () => ({
  type: ArticlesActions.FETCH_ERROR,
});

export const getArticles = (offset = 0) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles?offset=${offset}&tag=Markdown`).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadArticles(data));
  dispatch(fetching(false));
};

export const getFullArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles/${slug}`).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetching(false));
};
