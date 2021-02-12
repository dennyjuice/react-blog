import { deleteResource, fetchData, postFetch, updateResource } from '../../services';

import { IArticle, ArticlesActions, IArticles } from '../../types/articles';
import { Routes } from '../../helpers/constants';
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

export const fetchLike = (isLiking: boolean, slug?: string, isFull?: boolean) => ({
  type: ArticlesActions.FETCH_LIKE,
  isLiking,
  slug,
  isFull,
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
  const data = await postFetch(body, Routes.ARTICLES).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const updateArticle = (body: IForm, slug: string) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  const data = await updateResource(body, `${Routes.ARTICLES}/${slug}`).catch(() => dispatch(fetchArticlesError()));
  dispatch(loadFullArticle(data.article));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const deleteArticle = (slug: string) => async (dispatch: Function) => {
  dispatch(fetchingArticles(true));
  await deleteResource(`${Routes.ARTICLES}/${slug}`).catch(() => dispatch(fetchArticlesError()));
  dispatch(fetchingArticles(false));
  dispatch(successCreate(true));
};

export const likeArticle = (slug: string, liked: boolean, isFull = false) => async (dispatch: Function) => {
  dispatch(fetchLike(true));
  if (!liked) {
    await postFetch({}, `${Routes.ARTICLES}/${slug}${Routes.FAVORITE}`)
      .catch(() => dispatch(fetchArticlesError()))
      .finally(dispatch(fetchLike(false, slug, isFull)));
  }
  if (liked) {
    await deleteResource(`${Routes.ARTICLES}/${slug}${Routes.FAVORITE}`)
      .catch(() => dispatch(fetchArticlesError()))
      .finally(dispatch(fetchLike(false, slug, isFull)));
  }
};
