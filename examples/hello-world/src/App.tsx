import React, { FC, memo } from 'react';
import styles from './App.module.scss';

const App: FC = () => {
  return <div className={styles.wrapper}>Hello World</div>;
};

export default memo(App);
