import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './Header.module.scss';
import defaultUserImage from '../assets/defuserpic.jpg';
import { getProfile, logOut } from '../../redux/actions/user';
import { Routes } from '../../helpers/constants';

const Header: React.FC = () => {
  const { user, isLogged } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logOutUser = (event: any) => {
    event.preventDefault();
    localStorage.removeItem('token');
    dispatch(logOut());
    history.push(Routes.HOME);
  };

  return (
    <header>
      <div className={classes.title}>
        <h1>
          <Link to={Routes.HOME}>JMF Blog</Link>
        </h1>
      </div>

      {isLogged ? (
        <>
          <Link to={Routes.NEW_ARTICLE} className={classNames(classes.signUp, classes.create)}>
            Create article
          </Link>
          <Link to={Routes.PROFILE} className={classes.user}>
            <div className={classes.username}>{user.username}</div>
            <img src={user.image || defaultUserImage} alt="" />
          </Link>
          <a href="" className={classNames(classes.signIn, classes.logOut)} onClick={(event) => logOutUser(event)}>
            Log Out
          </a>
        </>
      ) : (
        <>
          <Link to={Routes.SIGN_IN} className={classes.signIn}>
            Sign In
          </Link>
          <Link to={Routes.SIGN_UP} className={classes.signUp}>
            Sign Up
          </Link>
        </>
      )}
    </header>
  );
};

export default React.memo(Header);
