import React from 'react';

import ArticleItem from '../../block/ArticleItem';
import Pagination from '../../block/Pagination';

import './ArticlesPage.module.scss';

const ArticlesPage: React.FC = () => (
  <>
    <ul>
      <li>
        <ArticleItem />
      </li>
      <li>
        <ArticleItem />
      </li>
      <li>
        <ArticleItem />
      </li>
      <li>
        <ArticleItem />
      </li>
      <li>
        <ArticleItem />
      </li>
    </ul>
    <Pagination postsPerPage={5} postsCount={20} />
  </>
);

export default ArticlesPage;
