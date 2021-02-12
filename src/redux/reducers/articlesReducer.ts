import { IArticlesAction, ArticlesActions, IArticlesState, IArticle } from '../../types/articles';

const defaultState: IArticlesState = {
  articles: null,
  articlesCount: 0,
  fullArticle: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLiking: false,
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
    case ArticlesActions.SUCCESS_CREATE:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };
    case ArticlesActions.FETCH_LIKE:
      if (action.slug && !action.isFull) {
        const likedItem: IArticle = state.articles.find((el) => el.slug === action.slug);
        likedItem.favorited = !likedItem.favorited;
        likedItem.favoritesCount = likedItem.favorited ? likedItem.favoritesCount + 1 : likedItem.favoritesCount - 1;
        const newStateArticles = state.articles.map((el) => {
          if (el.slug === likedItem.slug) {
            return likedItem;
          }
          return el;
        });

        return {
          ...state,
          articles: newStateArticles,
          isLiking: action.isLiking,
        };
      }

      if (action.slug && action.isFull) {
        const likedItem: IArticle = state.fullArticle;
        likedItem.favorited = !likedItem.favorited;
        likedItem.favoritesCount = likedItem.favorited ? likedItem.favoritesCount + 1 : likedItem.favoritesCount - 1;
        return {
          ...state,
          fullArticle: { ...state.fullArticle, ...likedItem },
          isLiking: action.isLiking,
        };
      }

      return {
        ...state,
        isLiking: action.isLiking,
      };
    default:
      return state;
  }
};

export default articlesReducer;
