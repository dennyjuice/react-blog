import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getFullArticle } from '../../../redux/actions/articles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import ArticleItem from '../../block/ArticleItem';
import classes from './FullArticlePage.module.scss';

const FullArticlePage: React.FC = () => {
  const { fullArticle, isLoading } = useTypedSelector((state) => state.articles);
  const dispatch = useDispatch();

  const { slug }: any = useParams();

  useEffect(() => {
    dispatch(getFullArticle(slug));
  }, [slug, dispatch]);

  return (
    <>
      {!isLoading && fullArticle && (
        <ArticleItem data={fullArticle} isFull>
          <div className={classes.fullText}>
            <ReactMarkdown allowDangerousHtml>{fullArticle.body}</ReactMarkdown>
          </div>
        </ArticleItem>
      )}
    </>
  );
};

export default React.memo(FullArticlePage);
