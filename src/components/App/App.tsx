import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import classes from './App.module.scss';
import 'nprogress/nprogress.css';

import Header from '../Header';
import ArticlesPage from '../pages/ArticlesPage';
import FullArticlePage from '../pages/FullArticlePage';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main className={classes.container}>
      <Route exact path={['/', '/articles']} component={ArticlesPage} />
      <Route exact path="/articles/:page" component={ArticlesPage} />

      <Route path="/article/:slug" component={FullArticlePage} />
    </main>
  </BrowserRouter>
);

export default App;
