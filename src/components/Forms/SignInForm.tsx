import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { loginUser } from '../../redux/actions/user';
import { ISignInForm } from '../../types/user';

import { Routes, validationRules } from '../../helpers/constants';
import styles from './Forms.module.scss';

const SignInForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<ISignInForm>();
  const { isFetching, error: serverError, isLogged } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data: ISignInForm) => {
    dispatch(
      loginUser({
        user: {
          email: data.email.toLowerCase(),
          password: data.password,
        },
      }),
    );
  };

  useEffect(() => {
    if (isLogged) {
      history.push(Routes.HOME);
    }
  }, [isLogged, history]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <legend>Sign In</legend>

      <label>
        Email address
        <input type="text" name="email" placeholder="Email address" ref={register(validationRules.email)} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </label>

      <label>
        Password
        <input type="password" name="password" placeholder="Password" ref={register(validationRules.password)} />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        {serverError && <span className={styles.error}>Email or password is invalid</span>}
      </label>

      <button type="submit" disabled={!!isFetching}>
        {isFetching ? <span className={styles.loading} /> : 'Login'}
      </button>
      <span className={styles.link}>
        Don’t have an account? <Link to={Routes.SIGN_UP}>Sign Up.</Link>
      </span>
    </form>
  );
};
export default SignInForm;
