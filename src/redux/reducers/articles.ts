import { IAction } from '../../helpers/types';
import { FETCH_ERROR, FETCHING, LOAD_ARTICLES, LOAD_FULL_ARTICLE } from '../../helpers/constants';

const defaultState = {
  isLoading: true,
  isError: false,
};

const articles = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return {
        ...state,
        articles: action.articles.articles,
        articlesCount: action.articles.articlesCount,
      };
    case LOAD_FULL_ARTICLE:
      return {
        ...state,
        fullArticle: action.article,
      };
    case FETCHING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};

export default articles;
