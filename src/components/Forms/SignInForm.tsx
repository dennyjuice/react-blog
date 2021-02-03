import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Forms.module.scss';

const SignInForm: React.FC = () => (
  <form className={styles.form}>
    <legend>Sign In</legend>
    <label>
      Email address
      <input type="email" name="email" placeholder="Email address" />
    </label>
    <label>
      Password
      <input type="password" name="password" placeholder="Password" />
    </label>

    <button type="button">Login</button>
    <span className={styles.link}>
      Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
    </span>
  </form>
);

export default SignInForm;
