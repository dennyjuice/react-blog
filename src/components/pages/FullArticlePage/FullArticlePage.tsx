import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getFullArticle } from '../../../redux/actions';

import ArticleItem from '../../block/ArticleItem';

import classes from './FullArticlePage.module.scss';

const FullArticlePage: React.FC = () => {
  const article = useSelector((state: any) => state.articles.fullArticle);
  const isLoading = useSelector((state: any) => state.articles.isLoading);
  const dispatch = useDispatch();

  const { slug }: any = useParams();

  useEffect(() => {
    if (!article) {
      dispatch(getFullArticle(slug));
    }
  }, [slug, dispatch, article]);

  return (
    <>
      {!isLoading && (
        <ArticleItem data={article || {}}>
          <div className={classes.fullText}>{article.body}</div>
        </ArticleItem>
      )}
    </>
  );
};

export default React.memo(FullArticlePage);
