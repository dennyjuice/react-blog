import React from 'react';
import classes from './Header.module.scss';

const Header = () => (
  <header>
    <div className={classes.title}>
      <h6>Blog</h6>
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
