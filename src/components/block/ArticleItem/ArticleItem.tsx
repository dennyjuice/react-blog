import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFullArticle } from '../../../redux/actions';

import { IArticle } from '../../../helpers/types';
import classes from './ArticleItem.module.scss';

interface IArticleItem {
  data: IArticle;
}

const ArticleItem: React.FC<IArticleItem> = ({ data, children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const getArticle = async (event: SyntheticEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault();
    await dispatch(getFullArticle(slug));
    history.push(`/article/${slug}`);
  };

  return (
    <>
      <div className={`${classes.article} ${children ? classes['vh-80'] : ''}`}>
        <div className={classes.header}>
          <h2>
            {!children ? (
              <a href="" onClick={(event) => getArticle(event, data.slug)}>
                {data.title}
              </a>
            ) : (
              data.title
            )}
          </h2>
          <div className={classes.likes}>{data.favoritesCount}</div>
          <ul className={classes.tags}>
            <li className={classes.tag}>Tag1</li>
          </ul>
        </div>
        <div className={classes.author}>
          <div className={classes.authorName}>{data.author.username}</div>
          <div className={classes.date}>March 5, 2020</div>
        </div>
        <img
          className={classes.avatar}
          src={data.author.image || 'https://pbs.twimg.com/media/EKjCpHhWwAEaE3W.jpg'}
          alt=""
        />
        <p className={`${classes.text} ${children ? classes.fullArticle : ''}`}>{data.description}</p>
        {children}
      </div>
    </>
  );
};

export default ArticleItem;
