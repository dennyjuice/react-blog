import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import classes from './Pagination.module.scss';

interface IPaginationProps {
  articlesPerPage: number;
  articlesCount: number;
  page: number;
}

const Pagination: React.FC<IPaginationProps> = ({ articlesPerPage, articlesCount, page = 1 }) => {
  const pageNumbers: number[] = [];

  if (!articlesCount) {
    return null;
  }

  for (let i = 1; i <= Math.floor(articlesCount / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={classes.pagination}>
      <Link to={`/articles/${page > 5 ? +page - 5 : 0}`} className={classes.pageItem}>
        {'<<'}
      </Link>

      {pageNumbers.slice(page > 6 ? +page - 6 : 0, +page + 5).map((number) => (
        <NavLink
          exact
          to={`/articles/${number === 1 ? '' : number}`}
          key={number}
          className={classes.pageItem}
          activeStyle={{
            backgroundColor: '#1890FF',
            color: '#fff',
          }}
        >
          <li>{number}</li>
        </NavLink>
      ))}

      <Link to={`/articles/${+page + 5}`} className={classes.pageItem}>
        {'>>'}
      </Link>
    </ul>
  );
};

export default Pagination;
