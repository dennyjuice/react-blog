import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../redux/actions';

import { ISignInForm } from '../../helpers/types';

import styles from './Forms.module.scss';

const SignInForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<ISignInForm>();
  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = async (data: ISignInForm) => {
    await dispatch(
      loginUser({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    );
    history.push('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <legend>Sign In</legend>

      <label>
        Email address
        <input
          type="text"
          name="email"
          placeholder="Email address"
          ref={register({
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: 'Password is required',
            validate: {
              less: (value) => value.length > 7 || 'Password should be at least 8 characters',
              many: (value) => value.length < 39 || 'Too much characters. Needs to be less than 40.',
            },
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </label>

      <button type="submit">Login</button>
      <span className={styles.link}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </form>
  );
};
export default SignInForm;
