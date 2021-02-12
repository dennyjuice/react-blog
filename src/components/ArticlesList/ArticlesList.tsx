import React from 'react';

import ArticleItem from '../block/ArticleItem';

import './ArticlesList.module.scss';
import { IArticle, IArticles } from '../../types/articles';

const ArticlesList: React.FC<IArticles> = ({ articles }) => (
  <>
    <ul>
      {articles.map((el: IArticle) => (
        <li key={el.slug}>
          <ArticleItem data={el} />
        </li>
      ))}
    </ul>
  </>
);

export default ArticlesList;
