import React from 'react';

import classes from './Pagination.module.scss';

interface IPaginationProps {
  postsPerPage: number;
  postsCount: number;
}

const Pagination: React.FC<IPaginationProps> = ({ postsPerPage, postsCount }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.floor(postsCount / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={classes.pagination}>
      <a href="#" className={classes.pageItem}>
        {'<'}
      </a>
      {pageNumbers.map((number: number) => (
        <a href="#" key={number} className={`${classes.pageItem}  ${number === 1 && classes.isActive}`}>
          <li>{number}</li>
        </a>
      ))}
      <a href="#" className={classes.pageItem}>
        {'>'}
      </a>
    </ul>
  );
};

export default Pagination;
