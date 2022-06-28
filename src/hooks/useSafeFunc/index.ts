/*
 * @Author: zml
 * @Date: 2022-06-27 11:42:18
 * @LastEditTime: 2022-06-28 13:54:20
 */
import { useUnmountedRef } from 'ahooks';

/**
 * 保证组件在mount周期中才运行的回调函数
 * @returns
 */
const useSafeFunc = () => {
  const ref = useUnmountedRef();
  const resFunc = (cb: () => void) => {
    const status: 'mounted' | 'unmounted' = ref.current
      ? 'unmounted'
      : 'mounted';
    if (status === 'mounted') {
      cb();
    }
  };

  return {
    /** 在组件被渲染的安全周期中运行 */
    safeRun: resFunc,
  };
};

export default useSafeFunc;
