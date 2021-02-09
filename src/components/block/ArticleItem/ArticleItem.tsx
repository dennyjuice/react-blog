import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import LinkButton from '../LinkButton';
import { deleteArticle, getFullArticle } from '../../../redux/actions/articles';
import formatDate from '../../../helpers/formatDate';
import newId from '../../../helpers/newId';

import { Routes } from '../../../helpers/constants';
import styles from './ArticleItem.module.scss';
import { IArticle } from '../../../types/articles';

import defaultUserImage from '../../assets/defuserpic.jpg';

interface IArticleItem {
  data: IArticle;
}

const ArticleItem: React.FC<IArticleItem> = ({ data, children }) => {
  const { user } = useTypedSelector((state) => state.user);
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

  const [showModal, setShowModal] = useState(false);

  const deleteHandle = async (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await dispatch(deleteArticle(data.slug));
    await history.push(Routes.HOME);
  };

  return (
    <>
      <div className={`${styles.article} ${children ? styles['vh-80'] : ''}`}>
        <div className={styles.header}>
          <div>
            <h2>
              {!children ? (
                <a href={`/article/${data.slug}`} onClick={(event) => getArticleDetails(event, data.slug)}>
                  {data.title}
                </a>
              ) : (
                data.title
              )}
            </h2>
            <button type="button" className={styles.likes} disabled>
              {data.favoritesCount}
            </button>
            <ul className={styles.tags}>
              {data.tagList.map((tag) => (
                <li className={styles.tag} key={newId('tag')}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.author}>
            <div className={styles.authorName}>
              {data.author.username}
              <span className={styles.date}>{createdAt}</span>
            </div>

            <img className={styles.avatar} src={data.author.image || defaultUserImage} alt="" />
          </div>
        </div>
        <div className={styles.descArea}>
          <p className={`${styles.text} ${children ? styles.fullArticle : ''}`}>{data.description}</p>
          {children && user && data.author.username === user.username && (
            <div className={styles.userButtons}>
              <a href="#" className={styles.delete} onClick={() => setShowModal(true)}>
                Delete
              </a>
              {showModal && (
                <div className={styles.modal}>
                  <span>Are you sure to delete this article?</span>
                  <a href="#" onClick={deleteHandle}>
                    Yes
                  </a>
                  <a href="#" onClick={() => setShowModal(false)}>
                    No
                  </a>
                </div>
              )}
              <LinkButton to={`/article/${data.slug}/edit`} classname={['green', 'small']}>
                Edit
              </LinkButton>
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default ArticleItem;
