import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import classes from './Header.module.scss';
import { IState, IUserState } from '../../helpers/types';

const Header: React.FC = () => {
  const user = useSelector<IState>((state) => state.userState) as IUserState;

  return (
    <header>
      <div className={classes.title}>
        <h1>
          <Link to="/">JMF Blog</Link>
        </h1>
      </div>

      {user.isLogged ? (
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
