import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  const { user, isLogged } = useTypedSelector((state) => state.user);

  return (
    <header>
      <div className={classes.title}>
        <h1>
          <Link to="/">JMF Blog</Link>
        </h1>
      </div>

      {isLogged ? (
        <>
          <Link to="" className={classNames(classes.signUp, classes.create)}>
            Create article
          </Link>
          <Link to="" className={classes.user}>
            <div className={classes.username}>{user.username}</div>
            <img src={user.image || 'https://pbs.twimg.com/media/EKjCpHhWwAEaE3W.jpg'} alt="" />
          </Link>
          <Link to="" className={classNames(classes.signIn, classes.logOut)}>
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/sign-in" className={classes.signIn}>
            Sign In
          </Link>
          <Link to="/sign-up" className={classes.signUp}>
            Sign Up
          </Link>
        </>
      )}
    </header>
  );
};

export default React.memo(Header);
