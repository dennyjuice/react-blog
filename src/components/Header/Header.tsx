import React, { SyntheticEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './Header.module.scss';
import defaultUserImage from '../assets/defuserpic.jpg';
import { getProfile, logOut } from '../../redux/actions/user';
import { Routes } from '../../helpers/constants';
import LinkButton from '../block/LinkButton';
import useBurgerMenu from '../../hooks/useBurgerMenu';

const Header: React.FC = () => {
  const { user, isLogged } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logOutUser = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem('token');
    dispatch(logOut());
    history.push(Routes.HOME);
  };

  const { isOpen, setIsOpenBurger, wrapperRef } = useBurgerMenu();

  return (
    <header ref={wrapperRef}>
      <div className={styles.title}>
        <h1>
          <Link to={Routes.HOME}>JMF Blog</Link>
        </h1>
      </div>

      <button
        type="button"
        className={cn(styles.burger, isOpen ? styles.open : '')}
        onClick={() => setIsOpenBurger(!isOpen)}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </button>

      {isLogged ? (
        <div className={cn(styles.navMenu, isOpen ? styles.open : '')}>
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
        </div>
      ) : (
        <div className={cn(styles.navMenu, isOpen ? styles.open : '')}>
          <LinkButton to={Routes.SIGN_IN} classname={['signIn']}>
            Sign In
          </LinkButton>
          <LinkButton to={Routes.SIGN_UP} classname={['green']}>
            Sign Up
          </LinkButton>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
