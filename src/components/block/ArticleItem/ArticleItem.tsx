import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ArticleItem.module.scss';

const ArticleItem = ({ children }: any) => (
  <div className={`${classes.article} ${children ? classes['vh-80'] : ''}`}>
    <div className={classes.header}>
      <h2>{!children ? <Link to="/articles/test">Some article title</Link> : 'Some article title'}</h2>
      <div className={classes.likes}>12</div>
      <ul className={classes.tags}>
        <li className={classes.tag}>Tag1</li>
      </ul>
    </div>
    <div className={classes.author}>
      <div className={classes.authorName}>John Doe</div>
      <div className={classes.date}>March 5, 2020</div>
    </div>
    <img
      className={classes.avatar}
      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a4/a48285c21efb70afb71582681973407dd6032668_full.jpg"
      alt=""
    />
    <p className={`${classes.text} ${children ? classes.fullArticle : ''}`}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.{' '}
    </p>
    {children}
  </div>
);

export default ArticleItem;
