import React from 'react';

import styles from './ErrorIndicator.module.scss';
import image404 from './404.png';

const ErrorIndicator: React.FC = () => (
  <div className={styles.error}>
    <img src={image404} alt="404" />
    <h1>OOPS!</h1>
    <span>Something went wrong!</span>
  </div>
);

export default ErrorIndicator;
