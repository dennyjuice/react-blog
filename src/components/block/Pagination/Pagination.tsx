import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Pagination.module.scss';

interface IPaginationProps {
  postsPerPage: number;
  postsCount: number;
}

const Pagination: React.FC<IPaginationProps> = ({ postsPerPage = 1, postsCount = 1 }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.floor(postsCount / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={classes.pagination}>
      <a href="#" className={classes.pageItem}>
        {'<'}
      </a>

      {pageNumbers.map((number) => (
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

      <a href="#" className={classes.pageItem}>
        {'>'}
      </a>
    </ul>
  );
};

export default Pagination;
