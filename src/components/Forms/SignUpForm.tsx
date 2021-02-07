import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { registerUser } from '../../redux/actions/user';
import { ISignUpForm } from '../../types/user';

import { EMAIL_VALIDATE_PATTERN } from '../../helpers/constants';

import styles from './Forms.module.scss';

const SignUpForm: React.FC = () => {
  const { register, errors, getValues, handleSubmit } = useForm<ISignUpForm>();
  const { isFetching } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data: ISignUpForm) => {
    await dispatch(
      registerUser({
        user: {
          username: data.username,
          email: data.email.toLowerCase(),
          password: data.password,
        },
      }),
    );
    history.push('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <legend>Create new account</legend>

      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={register({
            required: 'Username is required',
            validate: {
              less: (value) => value.length > 2 || 'Username should be at least 3 characters',
              many: (value) => value.length < 19 || 'Too much characters. Needs to be less than 20.',
            },
          })}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
      </label>

      <label>
        Email address
        <input
          type="text"
          name="email"
          placeholder="Email address"
          ref={register({
            required: 'Email is required',
            pattern: {
              value: EMAIL_VALIDATE_PATTERN,
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

      <label>
        Repeat Password
        <input
          type="password"
          name="matchingPassword"
          placeholder="Repeat Password"
          ref={register({
            required: 'Please repeat password',
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Passwords should match!';
              },
            },
          })}
        />
        {errors.matchingPassword && <span className={styles.error}>{errors.matchingPassword.message}</span>}
      </label>

      <span className={styles.hr} />

      <div className={styles.checkbox}>
        <input
          id="privacy"
          type="checkbox"
          name="privacy"
          defaultChecked
          ref={register({
            required: 'Please agree with processing',
            validate: { checked: (value) => value || 'Username should be at least 3 characters' },
          })}
        />
        <label htmlFor="privacy">I agree to the processing of my personal information</label>
        {errors.privacy && <span className={styles.error}>{errors.privacy.message}</span>}
      </div>

      <button type="submit" disabled={!!isFetching}>
        {isFetching ? <span className={styles.loading} /> : 'Create'}
      </button>
      <span className={styles.link}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </form>
  );
};
export default SignUpForm;
