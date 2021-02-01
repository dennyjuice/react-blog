import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getFullArticle } from '../../../redux/actions';

import ArticleItem from '../../block/ArticleItem';

import { ILoadFullArticleAction } from '../../../helpers/types';

import classes from './FullArticlePage.module.scss';

interface IFullArticleState {
  articles: ILoadFullArticleAction;
}

const FullArticlePage: React.FC = () => {
  const article = useSelector(({ articles }: IFullArticleState) => articles.fullArticle);
  const isLoading = useSelector(({ articles }: IFullArticleState) => articles.isLoading);
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
        <ArticleItem data={article}>
          <div className={classes.fullText}>
            <ReactMarkdown allowDangerousHtml>{article.body}</ReactMarkdown>
          </div>
        </ArticleItem>
      )}
    </>
  );
};

export default React.memo(FullArticlePage);
