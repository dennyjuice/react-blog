import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getFullArticle } from '../../../redux/actions/articles';
import formatDate from '../../../helpers/formatDate';
import newId from '../../../helpers/newId';

import classes from './ArticleItem.module.scss';
import { IArticle } from '../../../types/articles';

import defaultUserImage from '../../assets/defuserpic.jpg';

interface IArticleItem {
  data: IArticle;
}

const ArticleItem: React.FC<IArticleItem> = ({ data, children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const createdAt = useMemo(() => formatDate(data.createdAt), [data]);

  const getArticleDetails = useCallback(
    (event: SyntheticEvent<HTMLAnchorElement>, slug: string) => {
      event.preventDefault();
      dispatch(getFullArticle(slug));
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
              <li className={classes.tag} key={newId('tag')}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={`${classes.text} ${children ? classes.fullArticle : ''}`}>{data.description}</p>
        </div>
        <div className={classes.author}>
          <div className={classes.authorName}>
            {data.author.username}
            <span className={classes.date}>{createdAt}</span>
          </div>

          <img className={classes.avatar} src={data.author.image || defaultUserImage} alt="" />
        </div>

        {children}
      </div>
    </>
  );
};

export default ArticleItem;
