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
                  <span className={styles.exclamation}>
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="exclamation-circle"
                      width="1em"
                      height="1em"
                      fill="#FAAD14"
                      aria-hidden="true"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
                    </svg>
                    <span className={styles.confirm}>Are you sure to delete this article?</span>
                  </span>
                  <a className={styles.yesButton} href="#" onClick={deleteHandle}>
                    Yes
                  </a>
                  <a className={styles.noButton} href="#" onClick={() => setShowModal(false)}>
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
