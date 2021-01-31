import axios from 'axios';
import NProgress from 'nprogress';

import { IArticle } from '../../helpers/types';

export const loadArticles = (articles: IArticle[]) => ({
  type: 'LOAD_ARTICLES',
  articles,
});

export const loadFullArticle = (article: IArticle) => ({
  type: 'LOAD_FULL_ARTICLE',
  article,
});

export const fetching = (isLoading: boolean) => ({
  type: 'FETCHING',
  isLoading,
});

export const getArticles = (offset = 0) => async (dispatch: Function) => {
  NProgress.start();
  dispatch(fetching(true));
  const response = await axios(`https://conduit.productionready.io/api/articles?offset=${offset}&tag=React`);
  dispatch(loadArticles(response.data));
  dispatch(fetching(false));
  NProgress.done();
};

export const getFullArticle = (slug: string) => async (dispatch: Function) => {
  NProgress.start();
  dispatch(fetching(true));
  const response = await axios(`https://conduit.productionready.io/api/articles/${slug}`);
  dispatch(loadFullArticle(response.data.article));
  dispatch(fetching(false));
  NProgress.done();
};
