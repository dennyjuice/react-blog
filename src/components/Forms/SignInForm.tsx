import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Forms.module.scss';

interface ISignInForm {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<ISignInForm>();

  const onSubmit = (data: ISignInForm) => {
    console.log(data);
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
