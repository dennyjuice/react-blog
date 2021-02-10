import { deleteResource, fetchData, postFetch, updateResource } from '../../services';

import { IArticle, ArticlesActions, IArticles } from '../../types/articles';
import { LocalStorage, Routes } from '../../helpers/constants';
import { IForm } from '../../types/user';

export const loadArticles = (articles: IArticles) => ({
  type: ArticlesActions.LOAD_ARTICLES,
  articles,
});

export const loadFullArticle = (article: IArticle) => ({
  type: ArticlesActions.LOAD_FULL_ARTICLE,
  article,
});

export const fetchingArticles = (isLoading: boolean) => ({
  type: ArticlesActions.FETCHING,
  isLoading,
});

export const fetchArticlesError = () => ({
  type: ArticlesActions.FETCH_ERROR,
});

export const successCreate = (isSuccess: boolean) => ({
  type: ArticlesActions.SUCCESS_CREATE,
  isSuccess,
});

export const getArticles = (offset = 0) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const data = await fetchData(`${Routes.ARTICLES}?offset=${offset}`).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadArticles(data));
  dispatch(fetchingArticles(false));
};

export const getFullArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const data = await fetchData(`${Routes.ARTICLES}/${slug}`).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetchingArticles(false));
};

export const createArticle = (body: IForm) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const token = localStorage.getItem(LocalStorage.TOKEN);
  const data = await postFetch(body, Routes.ARTICLES, token).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const updateArticle = (body: IForm, slug: string) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const token = localStorage.getItem(LocalStorage.TOKEN);
  const data = await updateResource(body, `${Routes.ARTICLES}/${slug}`, token).catch(() =>
    dispatch(fetchArticlesError()),
  );
  dispatch(loadFullArticle(data.article));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const deleteArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const token = localStorage.getItem(LocalStorage.TOKEN);
  await deleteResource(`${Routes.ARTICLES}/${slug}`, token).catch(() => dispatch(fetchArticlesError()));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const likeArticle = (slug: string, liked: boolean) => async (dispatch: Function) => {
  const token = localStorage.getItem(LocalStorage.TOKEN);
  if (!liked) {
    await postFetch({}, `${Routes.ARTICLES}/${slug}${Routes.FAVORITE}`, token).catch(() =>
      dispatch(fetchArticlesError()),
    );
  }
  if (liked) {
    await deleteResource(`${Routes.ARTICLES}/${slug}${Routes.FAVORITE}`, token).catch(() =>
      dispatch(fetchArticlesError()),
    );
  }
};
