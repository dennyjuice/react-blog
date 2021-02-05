import React from 'react';

import styles from './ErrorIndicator.module.scss';
import imageError from './404.png';

const ErrorIndicator: React.FC = () => (
  <div className={styles.error}>
    <img src={imageError} alt="Error" />
    <h1>OOPS!</h1>
    <span>Something went wrong!</span>
  </div>
);

export default ErrorIndicator;
