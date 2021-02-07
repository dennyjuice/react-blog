import { IArticlesAction, ArticlesActions, IArticlesState } from '../../types/articles';

const defaultState: IArticlesState = {
  articles: null,
  articlesCount: 0,
  fullArticle: null,
  isLoading: false,
  isError: false,
};

const articlesReducer = (state = defaultState, action: IArticlesAction) => {
  switch (action.type) {
    case ArticlesActions.LOAD_ARTICLES:
      return {
        ...state,
        articles: action.articles.articles,
        articlesCount: action.articles.articlesCount,
      };
    case ArticlesActions.LOAD_FULL_ARTICLE:
      return {
        ...state,
        fullArticle: action.article,
      };
    case ArticlesActions.FETCHING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ArticlesActions.FETCH_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};

export default articlesReducer;
