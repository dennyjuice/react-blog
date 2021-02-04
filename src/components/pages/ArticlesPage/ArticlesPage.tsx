import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ArticlesList from '../../ArticlesList';
import Pagination from '../../block/Pagination';

import { IArticleState } from '../../../helpers/types';

import { getArticles } from '../../../redux/actions';

import './ArticlesPage.module.scss';

const ArticlesPage: React.FC = () => {
  const { articles, articlesCount } = useSelector((state: IArticleState) => state.articles);
  const isLoading = useSelector((state: IArticleState) => state.articles.isLoading);
  const dispatch = useDispatch();

  const { page }: any = useParams();

  useEffect(() => {
    dispatch(getArticles(page ? page * 10 : 0));
  }, [page, dispatch]);

  return (
    !isLoading && (
      <>
        <ArticlesList articles={articles || []} />
        <Pagination articlesPerPage={10} articlesCount={articlesCount} />
      </>
    )
  );
};

export default ArticlesPage;
