import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import classes from './App.module.scss';
import '../assets/nprogress.scss';

import Header from '../Header';
import ErrorBoundary from '../ErrorBoundary';
import PrivateRoute from '../PrivateRoute';
import ArticlesPage from '../pages/ArticlesPage';
import FullArticlePage from '../pages/FullArticlePage';
import { SignUpForm, SignInForm, UpdateProfileForm, EditArticleForm } from '../Forms';
import { Routes } from '../../helpers/constants';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main className={classes.container}>
      <ErrorBoundary>
        <Switch>
          <Route exact path={[Routes.HOME, Routes.ARTICLES, Routes.ARTICLES_PAGE]} component={ArticlesPage} />
          <Route exact path={Routes.ARTICLE} component={FullArticlePage} />
          <Route
            exact
            path={Routes.EDIT_ARTICLE}
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticleForm edit slug={slug} />;
            }}
          />
          <PrivateRoute exact path={Routes.NEW_ARTICLE} component={EditArticleForm} />

          <Route path={Routes.SIGN_UP} component={SignUpForm} />
          <Route path={Routes.SIGN_IN} component={SignInForm} />
          <Route path={Routes.PROFILE} component={UpdateProfileForm} />
        </Switch>
      </ErrorBoundary>
    </main>
  </BrowserRouter>
);
export default App;
