import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header: React.FC = () => (
  <header>
    <div className={classes.title}>
      <h1>
        <Link to="/">JMF Blog</Link>
      </h1>
    </div>
    <Link to="/sign-in" className={classes.signIn}>
      Sign In
    </Link>
    <Link to="/sign-up" className={classes.signUp}>
      Sign Up
    </Link>
  </header>
);

export default Header;
