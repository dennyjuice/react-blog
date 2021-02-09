import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './App.module.scss';
import 'nprogress/nprogress.css';

import Header from '../Header';
import ErrorBoundary from '../ErrorBoundary';
// import ErrorIndicator from '../ErrorBoundary/ErrorIndicator';
import ArticlesPage from '../pages/ArticlesPage';
import FullArticlePage from '../pages/FullArticlePage';
import { SignUpForm, SignInForm, UpdateProfileForm, EditArticleForm } from '../Forms';
import { Routes } from '../../helpers/constants';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  // const { isError } = useTypedSelector((state) => state.articles);

  return (
    <BrowserRouter>
      <Header />
      <main className={classes.container}>
        <ErrorBoundary>
          <Switch>
            <Route exact path={[Routes.HOME, Routes.ARTICLES, Routes.ARTICLES_PAGE]} component={ArticlesPage} />
            <Route path={Routes.ARTICLE} component={FullArticlePage} />
            <Route path={Routes.EDIT_ARTICLE} component={FullArticlePage} />
            <Route path={Routes.NEW_ARTICLE} component={EditArticleForm} />

            <Route path={Routes.SIGN_UP} component={SignUpForm} />
            <Route path={Routes.SIGN_IN} component={SignInForm} />
            <Route path={Routes.PROFILE} component={UpdateProfileForm} />
          </Switch>
        </ErrorBoundary>
      </main>
    </BrowserRouter>
  );
};
export default App;
