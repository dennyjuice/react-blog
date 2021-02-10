import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../../redux/actions/articles';

import { useTypedSelector } from '../../../hooks/useTypedSelector';

import ArticlesList from '../../ArticlesList';
import Pagination from '../../block/Pagination';

import './ArticlesPage.module.scss';

const ArticlesPage: React.FC = () => {
  const { isLoading, articles, articlesCount } = useTypedSelector((state) => state.articles);
  const dispatch = useDispatch();

  const { page }: any = useParams();

  useEffect(() => {
    dispatch(getArticles(page ? page * 10 : 0));
  }, [dispatch, page]);

  // TODO Сменить пагинацию
  return (
    !isLoading &&
    articles && (
      <>
        <ArticlesList articles={articles} />
        <Pagination articlesPerPage={10} articlesCount={articlesCount} page={page} />
      </>
    )
  );
};

export default ArticlesPage;
