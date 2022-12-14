/*
 * @Author: zml
 * @Date: 2022-06-06 13:01:30
 * @LastEditTime: 2022-07-26 19:09:30
 */
import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button } from 'antd';
import type { GetIProps } from '../../types';

type IProps = Omit<GetIProps<typeof Button>, 'onClick'> & {
  /** 点击事件加上promise的处理, 其他配置与Button标签一样 */
  onClick?: () => void | Promise<void>;
};
const ButtonAsync: React.FC<IProps> = (props) => {
  const { children, onClick, ...resetProps } = props;
  const [loading, setLoading] = useSafeState(false);
  const clickHandle = useMemoizedFn(async () => {
    const res = onClick?.();
    if (res instanceof Promise) {
      setLoading(true);
      try {
        await res;
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  });

  return (
    <Button loading={loading} onClick={clickHandle} {...resetProps}>
      {children}
    </Button>
  );
};

export default ButtonAsync;
