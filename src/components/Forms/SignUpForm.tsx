import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Forms.module.scss';

const SignUpForm: React.FC = () => (
  <form className={styles.form}>
    <legend>Create new account</legend>
    <label>
      Username
      <input type="text" name="username" placeholder="Username" />
    </label>
    <label>
      Email address
      <input type="email" name="email" placeholder="Email address" />
    </label>
    <label>
      Password
      <input type="password" name="password" placeholder="Password" />
    </label>
    <label>
      Repeat Password
      <input type="password" name="password" placeholder="Repeat Password" />
    </label>
    <span className={styles.hr} />
    <div className={styles.checkbox}>
      <input id="privacy" type="checkbox" name="privacy" checked />
      <label htmlFor="privacy">I agree to the processing of my personal information</label>
    </div>

    <button type="button">Create</button>
    <span className={styles.link}>
      Already have an account? <Link to="/sign-in">Sign In.</Link>
    </span>
  </form>
);

export default SignUpForm;
