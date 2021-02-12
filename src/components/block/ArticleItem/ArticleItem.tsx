import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import LinkButton from '../LinkButton';
import ModalDelete from '../ModalDelete';
import Like from '../Like';
import { deleteArticle, getFullArticle, likeArticle } from '../../../redux/actions/articles';
import formatDate from '../../../helpers/formatDate';
import uniqueId from '../../../helpers/uniqueId';

import { Routes } from '../../../helpers/constants';
import styles from './ArticleItem.module.scss';
import { IArticle } from '../../../types/articles';

import defaultUserImage from '../../assets/defuserpic.jpg';

interface IArticleItem {
  data: IArticle;
  isFull?: boolean;
}

const ArticleItem: React.FC<IArticleItem> = ({ data, isFull, children }) => {
  const { user, isLogged } = useTypedSelector((state) => state.user);
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

  const likeHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(likeArticle(data.slug, data.favorited, isFull));
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

            <Like
              isLogged={isLogged}
              liked={data.favorited}
              count={data.favoritesCount}
              likeHandle={(event: React.MouseEvent<HTMLButtonElement>) => likeHandle(event)}
            />

            <ul className={styles.tags}>
              {data.tagList.map((tag) => (
                <li className={styles.tag} key={uniqueId('tag_')}>
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
              <button type="button" className={styles.delete} onClick={() => setShowModal(true)}>
                Delete
              </button>
              <ModalDelete
                showModal={showModal}
                deleteHandle={(event: SyntheticEvent<HTMLAnchorElement>) => deleteHandle(event)}
                hideModal={(event: SyntheticEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  setShowModal(false);
                }}
              />
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
