import { FETCHING, FETCH_ERROR, LOAD_ARTICLES, LOAD_FULL_ARTICLE } from '../../helpers/constants';

import { authenticate, fetchData } from '../../services';

import { IAction, IArticle, IUserState } from '../../helpers/types';

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

export const fetchError = (): IAction => ({
  type: FETCH_ERROR,
});

export const getArticles = (offset = 0) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles?offset=${offset}&tag=Markdown`).catch(() => dispatch(fetchError()));
  dispatch(loadArticles(data));
  dispatch(fetching(false));
};

export const getFullArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetching(true));
  const data = await fetchData(`/articles/${slug}`).catch(() => dispatch(fetchError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetching(false));
};

// TODO Разбить на файлы и добавить обработку ошибок

export const login = (user: IUserState) => ({
  type: 'LOGIN',
  user,
});

export const loginUser = (body: any) => async (dispatch: Function) => {
  const data = await authenticate(body);
  dispatch(login(data.user));
};
