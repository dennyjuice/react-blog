import React from 'react';

import ArticleItem from '../block/ArticleItem';
import newId from '../../helpers/newId';

import './ArticlesList.module.scss';
import { IArticle, IArticles } from '../../types/articles';

const ArticlesList: React.FC<IArticles> = ({ articles }) => (
  <>
    <ul>
      {articles.map((el: IArticle) => (
        <li key={newId('article')}>
          <ArticleItem data={el} />
        </li>
      ))}
    </ul>
  </>
);

export default ArticlesList;
