import { createContext, useEffect, useReducer } from 'react';
import dayjs from 'dayjs';
import { FILTER_ACTIONS } from '../actions/filterActions';
import { filterReducer, INITIAL_STATE } from '../reducers/filterReducer';
import { API } from '../common/api';

const byFilter = (by) => (by === 'byPopularity' ? API.searchNews : API.getNews);

const forFilter = (time) => {
  let beforeTime = '';
  switch (time) {
    case 'last24h':
      beforeTime = dayjs().subtract(24, 'hour');
      break;
    case 'pastWeek':
      beforeTime = dayjs().subtract(7, 'day');
      break;
    case 'lastMonth':
      beforeTime = dayjs().subtract(1, 'month');
      break;
    case 'lastYear':
      beforeTime = dayjs().subtract(1, 'year');
      break;
    default:
      return '';
  }

  // return `&numericFilters=created_at_i>${beforeTime.valueOf()},created_at_i<${Date.now()}`;
  return `&numericFilters=(created_at_i>${beforeTime.valueOf()},created_at_i<${Date.now()})`;
};

export const NewsContext = createContext(null);

export default function NewsContextProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);

  const handleInput = (name, value) =>
    dispatch({
      type: FILTER_ACTIONS.CHANGE_INPUT,
      payload: { name, value },
    });

  const fetchNews = async () => {
    let query = state.search
      ? `?query=${state.search}&tags=${state.type}`
      : `?tags=${state.type}`;

    // Filters configuration: "by"
    const api = byFilter(state.by);

    // Filters configuration: "for"
    query += forFilter(state.for, state.by);

    // Page change
    query += state.pageNum ? `&page=${state.pageNum}` : '';

    const url = `${api}${query}`;
    console.log({ url });
    dispatch({ type: FILTER_ACTIONS.FETCHING_NEWS });
    try {
      const data = await fetch(url);
      const res = await data.json();

      console.log({ res });
      dispatch({
        type: FILTER_ACTIONS.FETCH_NEWS_SUCCESS,
        payload: res,
      });
    } catch (error) {
      console.log({ error });
      dispatch({ type: FILTER_ACTIONS.FETCH_NEWS_ERROR });
    }
  };

  useEffect(() => {
    fetchNews();
  }, [state.type, state.by, state.for, state.search, state.pageNum]);

  const contextValue = {
    handleInput,
    state,
    dispatch,
  };
  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
}
