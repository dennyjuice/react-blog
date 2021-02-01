import { FETCHING, LOAD_ARTICLES, LOAD_FULL_ARTICLE } from '../../helpers/constants';

import { fetchData } from '../../services';

import { IAction, IArticle } from '../../helpers/types';

export const loadArticles = (articles: IArticle[]): IAction => ({
  type: LOAD_ARTICLES,
  articles,
});

export const loadFullArticle = (article: IArticle): IAction => ({
  type: LOAD_FULL_ARTICLE,
  article,
});

export const fetching = (isLoading: boolean): IAction => ({
  type: FETCHING,
  isLoading,
});

export const getArticles = (offset = 0) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles?offset=${offset}&tag=Markdown`);
  dispatch(loadArticles(data));
  dispatch(fetching(false));
};

export const getFullArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles/${slug}`);
  dispatch(loadFullArticle(data.article));
  dispatch(fetching(false));
};
