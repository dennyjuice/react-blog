import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { registerUser } from '../../redux/actions/user';
import { ISignUpForm } from '../../types/user';

import { Routes, validationRules } from '../../helpers/constants';
import styles from './Forms.module.scss';

const SignUpForm: React.FC = () => {
  const { register, errors, handleSubmit, watch } = useForm<ISignUpForm>();
  const { username, email, password } = watch(['username', 'email', 'password']);
  const privacy = watch('privacy', true);

  const { isFetching, error: serverError, isLogged } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data: ISignUpForm) => {
    dispatch(
      registerUser({
        user: {
          username: data.username,
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
      <legend>Create new account</legend>

      <label>
        Username
        <input
          aria-invalid={!!errors.username}
          type="text"
          name="username"
          placeholder="Username"
          ref={register(validationRules.username)}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        {serverError && <span className={styles.error}>{serverError.username}</span>}
      </label>

      <label>
        Email address
        <input
          aria-invalid={!!errors.email}
          type="text"
          name="email"
          placeholder="Email address"
          ref={register(validationRules.email)}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        {serverError && <span className={styles.error}>{serverError.email}</span>}
      </label>

      <label>
        Password
        <input
          aria-invalid={!!errors.password}
          type="password"
          name="password"
          placeholder="Password"
          ref={register(validationRules.password)}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        {serverError && <span className={styles.error}>{serverError.password}</span>}
      </label>

      <label>
        Repeat Password
        <input
          aria-invalid={!!errors.matchingPassword}
          type="password"
          name="matchingPassword"
          placeholder="Repeat Password"
          ref={register({
            required: 'Please repeat password',
            validate: {
              matchesPreviousPassword: (value) => password === value || 'Passwords should match!', // const { password } = getValues();
            },
          })}
        />
        {errors.matchingPassword && <span className={styles.error}>{errors.matchingPassword.message}</span>}
      </label>

      <span className={styles.hr} />

      <div className={styles.checkbox}>
        <input id="privacy" type="checkbox" name="privacy" defaultChecked ref={register(validationRules.privacy)} />
        <label htmlFor="privacy">I agree to the processing of my personal information</label>
        {errors.privacy && <span className={styles.error}>{errors.privacy.message}</span>}
      </div>

      <button type="submit" disabled={!!isFetching || (!username && !email && !password && !privacy)}>
        {isFetching ? <span className={styles.loading} /> : 'Create'}
      </button>
      <span className={styles.link}>
        Already have an account? <Link to={Routes.SIGN_IN}>Sign In.</Link>
      </span>
    </form>
  );
};
export default SignUpForm;
