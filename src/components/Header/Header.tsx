import React, { SyntheticEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './Header.module.scss';
import defaultUserImage from '../assets/defuserpic.jpg';
import { getProfile, logOut } from '../../redux/actions/user';
import { Routes } from '../../helpers/constants';
import LinkButton from '../block/LinkButton';

const Header: React.FC = () => {
  const { user, isLogged } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logOutUser = (event: SyntheticEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    localStorage.removeItem('token');
    dispatch(logOut());
    history.push(Routes.HOME);
  };

  return (
    <header>
      <div className={styles.title}>
        <h1>
          <Link to={Routes.HOME}>JMF Blog</Link>
        </h1>
      </div>

      {isLogged ? (
        <>
          <LinkButton to={Routes.NEW_ARTICLE} classname={['green', 'small']}>
            Create article
          </LinkButton>
          <Link to={Routes.PROFILE} className={styles.user}>
            <div className={styles.username}>{user.username}</div>
            <img src={user.image || defaultUserImage} alt="" />
          </Link>
          <a href="" className={styles.logOut} onClick={(event) => logOutUser(event)}>
            Log Out
          </a>
        </>
      ) : (
        <>
          <LinkButton to={Routes.SIGN_IN} classname={['signIn']}>
            Sign In
          </LinkButton>
          <LinkButton to={Routes.SIGN_UP} classname={['green']}>
            Sign Up
          </LinkButton>
        </>
      )}
    </header>
  );
};

export default React.memo(Header);
