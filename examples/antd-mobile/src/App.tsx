import React, { FC, memo } from 'react';
import styles from './App.module.scss';
import { Button, Tag } from 'antd-mobile';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Button type="primary" icon="smile">Antd Mobile Button</Button>
      <br />
      <Tag>Tags</Tag>
    </div>
  );
};

export default memo(App);
