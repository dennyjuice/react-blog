import React from 'react';
import ArticleItem from '../block/ArticleItem';
import { IArticle } from '../../helpers/types';

import './ArticlesList.module.scss';

interface IArticlesListProps {
  articles: IArticle[];
}

const ArticlesList: React.FC<IArticlesListProps> = ({ articles }) => (
  <>
    <ul>
      {articles.map((el: IArticle) => (
        <li key={el.createdAt}>
          <ArticleItem data={el} />
        </li>
      ))}
    </ul>
  </>
);

export default ArticlesList;
