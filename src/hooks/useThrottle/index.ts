/*
 * @Author: zml
 * @Date: 2022-06-15 19:05:47
 * @LastEditTime: 2022-06-15 21:12:37
 */
import { useMemoizedFn } from 'ahooks';
import { throttle } from 'lodash';
import { useMemo } from 'react';

/**
 *
 * @param cb 需要节流的函数，弥补ahook中间触发的时候会更新函数的情况
 * @param wait 节流时间默认是，单位毫秒，默认是0毫秒
 * @returns 节流处理后的函数
 */
const useThrottle = <F extends (...args: never[]) => unknown>(
  cb: F,
  wait: number = 0,
) => {
  const submit = useMemoizedFn<F>(((...args) => {
    return cb(...args);
  }) as F);

  const resFunc = useMemo(() => {
    return throttle(submit, wait);
  }, [submit]);

  return resFunc;
};

export default useThrottle;
