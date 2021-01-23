import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.module.scss';

import Header from '../Header';
import ArticlesPage from '../pages/ArticlesPage';

const App = () => (
  <BrowserRouter>
    <Header />

    <Route path={['/', '/articles']} component={ArticlesPage} />
  </BrowserRouter>
);

export default App;
