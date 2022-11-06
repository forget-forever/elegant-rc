/*
 * @Author: zml
 * @Date: 2022-06-28 11:22:16
 * @LastEditTime: 2022-06-28 13:56:18
 */
import { useMemoizedFn, useMount } from 'ahooks';
import { Button, message } from 'antd';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { useSafeFunc } from 'elegant-rc';

const request = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(uniqueId('safeFunc-'));
    }, 5000);
  });
};

const Component: React.FC = () => {
  const { safeRun } = useSafeFunc();
  const [id, setId] = useState('loading...');

  useMount(async () => {
    setId('loading...');
    const res = await request();
    safeRun(() => {
      message.success('write id！！');
      setId(res);
    });
  });

  return <div>{id}</div>;
};

export default () => {
  const [mount, setMount] = useState(true);

  const clickHandle = useMemoizedFn(() => {
    setMount(!mount);
  });

  return (
    <>
      <Button onClick={clickHandle}>click me!</Button>
      {mount && <Component />}
    </>
  );
};
