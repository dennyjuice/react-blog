const defaultState = {
  isLoading: true,
};

const articles = (state: any = defaultState, action: any) => {
  switch (action.type) {
    case 'LOAD_ARTICLES':
      return {
        ...state,
        articles: action.articles.articles,
        articlesCount: action.articles.articlesCount,
      };
    case 'LOAD_FULL_ARTICLE':
      return {
        ...state,
        fullArticle: action.article,
      };
    case 'FETCHING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default articles;
