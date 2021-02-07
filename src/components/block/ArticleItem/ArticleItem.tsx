import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getFullArticle } from '../../../redux/actions';
import formatDate from '../../../helpers/formatDate';

import classes from './ArticleItem.module.scss';
import { IArticle } from '../../../types/articles';

interface IArticleItem {
  data: IArticle;
}

const ArticleItem: React.FC<IArticleItem> = ({ data, children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const createdAt = useMemo(() => formatDate(data.createdAt), [data]);

  const getArticleDetails = useCallback(
    async (event: SyntheticEvent<HTMLAnchorElement>, slug: string) => {
      event.preventDefault();
      await dispatch(getFullArticle(slug));
      history.push(`/article/${slug}`);
    },
    [dispatch, history],
  );

  return (
    <>
      <div className={`${classes.article} ${children ? classes['vh-80'] : ''}`}>
        <div className={classes.header}>
          <h2>
            {!children ? (
              <a href={`article/${data.slug}`} onClick={(event) => getArticleDetails(event, data.slug)}>
                {data.title}
              </a>
            ) : (
              data.title
            )}
          </h2>
          <button type="button" className={classes.likes} disabled>
            {data.favoritesCount}
          </button>
          <ul className={classes.tags}>
            {data.tagList.map((tag) => (
              // TODO: add key create function
              <li className={classes.tag} key={Date.now()}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.author}>
          <div className={classes.authorName}>{data.author.username}</div>
          <div className={classes.date}>{createdAt}</div>
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
