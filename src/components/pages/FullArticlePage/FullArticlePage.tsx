import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getFullArticle } from '../../../redux/actions';

import ArticleItem from '../../block/ArticleItem';

import classes from './FullArticlePage.module.scss';

const FullArticlePage: React.FC = () => {
  const { isLoading, fullArticle } = useTypedSelector((state) => state.articles);
  const dispatch = useDispatch();

  const { slug }: any = useParams();

  useEffect(() => {
    if (!fullArticle) {
      dispatch(getFullArticle(slug));
    }
  }, [slug, dispatch, fullArticle]);

  return (
    <>
      {!isLoading && (
        <ArticleItem data={fullArticle}>
          <div className={classes.fullText}>
            <ReactMarkdown allowDangerousHtml>{fullArticle.body}</ReactMarkdown>
          </div>
        </ArticleItem>
      )}
    </>
  );
};

export default React.memo(FullArticlePage);
