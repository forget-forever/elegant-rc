/*
 * @Author: zml
 * @Date: 2022-06-15 19:14:11
 * @LastEditTime: 2022-07-18 13:47:09
 */
import { useMemoizedFn } from 'ahooks';
import { debounce } from 'lodash';
import { useMemo } from 'react';

/**
 *
 * @param cb 需要防抖的函数，弥补ahook中间触发的时候会更新函数的情况
 * @param wait 防抖时间默认是，单位毫秒，默认是0毫秒
 * @returns 防抖处理后的函数
 */
const useDebounce = <F extends (...args: never[]) => unknown>(
  cb: F,
  wait = 0,
) => {
  const submit = useMemoizedFn<F>(((...args) => {
    return cb(...args);
  }) as F);

  const resFunc = useMemo(() => {
    return debounce(submit, wait);
  }, [submit, wait]);

  return resFunc;
};

export default useDebounce;
