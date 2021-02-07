import React from 'react';
import ArticleItem from '../block/ArticleItem';

import './ArticlesList.module.scss';
import { IArticle, IArticles } from '../../types/articles';

const ArticlesList: React.FC<IArticles> = ({ articles }) => (
  <>
    <ul>
      {articles.map((el: IArticle) => (
        // TODO: add key create function
        <li key={el.createdAt}>
          <ArticleItem data={el} />
        </li>
      ))}
    </ul>
  </>
);

export default ArticlesList;
