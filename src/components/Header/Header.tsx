import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = () => (
  <header>
    <div className={classes.title}>
      <h1>Blog</h1>
    </div>
    <button type="button" className={classes.signIn}>
      Sign In
    </button>
    <button type="button" className={classes.signUp}>
      Sign Up
    </button>
  </header>
);

export default Header;
