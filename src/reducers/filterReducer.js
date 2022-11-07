export const INITIAL_STATE = {
  search: '',
  type: 'story',
  by: 'byPopularity',
  for: 'all',
  loading: false,
  error: false,
  news: [],
  pageNum: 0,
  results: 0,
  pages: 0,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING_NEWS':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_NEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        news: action.payload.hits,
        pageNum: action.payload.page,
        results: action.payload.nbHits,
        pages: action.payload.nbPages,
      };
    case 'FETCH_NEWS_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        pageNum: action.payload.page,
      };

    default:
      return state;
  }
};
