import React, { useContext } from 'react';
import { NewsContext } from '../../contexts/NewsContext';
import { FILTER_ACTIONS } from '../../actions/filterActions';
import assets from '../../assets';

const geenrateLinks = (pages, pageNum) => {
  if ([1, pages - 2].includes(pageNum)) {
    return [...new Array(7)];
  }

  if ([2, pages - 3].includes(pageNum)) {
    return [...new Array(8)];
  }

  if ([3, pages - 4].includes(pageNum)) {
    return [...new Array(9)];
  }

  if ([4, pages - 5].includes(pageNum)) {
    return [...new Array(10)];
  }

  if (pageNum > 4 && pageNum < pages - 5) {
    return [...new Array(11)];
  }

  if (pages < 6 && pages > 1) {
    return [...new Array(pages)];
  }

  return [...new Array(6)];
};

export default function CustomFooter() {
  const { state, dispatch } = useContext(NewsContext);

  const pageLinks = geenrateLinks(state.pages, state.pageNum);

  const changePage = (nextPage) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_PAGE,
      payload: {
        page: nextPage,
      },
    });
  };

  /*
    11 pages are constantly to be shown in the pagination after page number 4
    Upto page #6, we need to constantly move the active page from left end to right end
    After page #6, which is a center point for 11 pages as both of its sides have 5 pages each, the active page needs to be at the center
    We have index which always starts from 0, calculates the 11 pages
    But, for the offset to be added to each of the page so that it maintains 11 pages always, we have only state.pageNum as a variable
    Adding the pageNum, we make it to start the page with the current pageNum value
    So, we need to show the before 5 pages as well
    Hence, subtracting it to the variable logic, we got state.pageNum + index - 4
    ----------EXPLAIN----------
    Upto page #6, we do not need to maintian any pages length, so we directly show "index + 1" as we are starting from 0
    After page #6, "state.pageNum + index + 1" as we have to change the page as per the page number we are in
    But, this makes the starting of the page from "7" and discards previous pages from "2 to 6"
    As we need to maintain 11 pages and also we need to show previous 5 pages, we subtract it by 5 i.e.,
    state.pageNum + index + 1 - 5 = state.pageNum + index - 4
  */
  const displayValue = (index) =>
    state.pageNum < 6 ? index + 1 : state.pageNum + index - 4;

  const isActive = (index) =>
    displayValue(index) === state.pageNum + 1
      ? 'page__link active'
      : 'page__link';

  const prevPageArrow = () =>
    state.pageNum > 0 ? (
      <div
        className="page__link"
        style={{ padding: '0.1rem 0.3rem' }}
        onClick={() => changePage(0)}
      >
        <img src={assets.prevSvg} alt="Previous" />
      </div>
    ) : null;

  const nextPageArrow = () =>
    state.pageNum < state.pages - 1 ? (
      <div
        className="page__link"
        style={{ padding: '0.1rem 0.3rem' }}
        onClick={() => changePage(state.pages - 1)}
      >
        <img src={assets.nextSvg} alt="Next" />
      </div>
    ) : null;

  if (state.loading || !state.news.length || state.pages === 1) {
    return null;
  }

  return (
    <section className="paginator__component">
      {prevPageArrow()}
      {pageLinks.map((pageLink, index) => (
        <div
          className={isActive(index)}
          key={index}
          onClick={() => changePage(displayValue(index) - 1)}
          data-attr={displayValue(index) - 1}
        >
          {displayValue(index)}
        </div>
      ))}
      {nextPageArrow()}
    </section>
  );
}
