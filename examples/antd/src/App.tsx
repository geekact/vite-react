import React, { FC, memo } from 'react';
import styles from './App.module.scss';
import { Button, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Button type="primary" icon={<SmileOutlined />}>Antd Button</Button>
      <br />
      <Tag color="orange">Tags</Tag>
    </div>
  );
};

export default memo(App);
