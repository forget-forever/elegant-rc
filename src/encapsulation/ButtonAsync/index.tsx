/*
 * @Author: zml
 * @Date: 2022-06-06 13:01:30
 * @LastEditTime: 2022-07-26 19:09:30
 */
import React, { useRef } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button } from 'antd';
import type { GetIProps } from '../../types';

type IProps = Omit<GetIProps<typeof Button>, 'onClick'> & {
  /** 点击事件加上promise的处理, 其他配置与Button标签一样 */
  onClick?: () => void | Promise<void>;
  /**
   * loading动画的delay处理，如果返回的promise的结束速度比这个delay短，那就放弃loading
   * @default undefined
   */
  loadingDelay?: number;
};
const ButtonAsync: React.FC<IProps> = (props) => {
  const { children, onClick, loadingDelay, ...resetProps } = props;
  const [loading, setLoading] = useSafeState(false);

  const temp = useRef({
    /** 真实的是否在loading状态, 这个变量永远保留最真实的promise的loading状态 */
    loading: false,
    loadingTask: undefined as undefined | ReturnType<typeof setTimeout>,
  });

  const clickHandle = useMemoizedFn(async () => {
    /** 加载状态就不要继续执行了 */
    if (temp.current.loading) {
      return;
    }
    const res = onClick?.();
    if (res instanceof Promise) {
      temp.current.loading = true;

      if (typeof loadingDelay === 'number' && loadingDelay >= 0) {
        clearTimeout(temp.current.loadingTask);
        /** delay处理 */
        temp.current.loadingTask = setTimeout(() => {
          /** 确实还在loading，那就加loading动画 */
          if (temp.current.loading) {
            setLoading(true);
          }
        }, loadingDelay);
      } else {
        setLoading(true);
      }

      try {
        await res;
      } catch (error) {
        console.error(error);
      }
      /**
       * 需要清除延迟任务，状态置位成false
       */
      clearTimeout(temp.current.loadingTask);
      temp.current.loadingTask = undefined;
      temp.current.loading = false;
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
