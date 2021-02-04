import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import classes from './App.module.scss';
import 'nprogress/nprogress.css';

import Header from '../Header';
import ErrorBoundary from '../ErrorBoundary';
import ErrorIndicator from '../ErrorBoundary/ErrorIndicator';
import ArticlesPage from '../pages/ArticlesPage';
import FullArticlePage from '../pages/FullArticlePage';
import { SignUpForm, SignInForm } from '../Forms';

import { IArticleState } from '../../helpers/types';

const App: React.FC = () => {
  const isError = useSelector((state: IArticleState) => state.articles.isError);

  return (
    <BrowserRouter>
      <Header />
      <main className={classes.container}>
        <ErrorBoundary>
          <Switch>
            <Route exact path={['/', '/articles', '/articles/:page']} component={ArticlesPage} />
            <Route path="/article/:slug" component={FullArticlePage} />

            <Route path="/sign-up" component={SignUpForm} />
            <Route path="/sign-in" component={SignInForm} />
          </Switch>

          {isError && <ErrorIndicator />}
        </ErrorBoundary>
      </main>
    </BrowserRouter>
  );
};
export default App;
