/*
 * @Author: zml
 * @Date: 2022-06-08 19:51:51
 * @LastEditTime: 2022-06-08 20:20:15
 */
import { useEffect, useMemo } from 'react';
import type { Column, ParamsType } from './types';

/**
 * 实现searchSpan的hook
 * @param fcid 组件的id
 * @param columns 列
 */
export const useSearchSpanEffect = <R extends ParamsType>(
  fcid: string,
  columns: Column<R>[] = [],
) => {
  const spanCols = useMemo(
    () =>
      columns
        .filter((item) => !item.hideInSearch && !item.hideInForm)
        .map(({ searchSpan }) => searchSpan),
    [columns],
  );

  useEffect(() => {
    const domList = document.querySelectorAll(
      `.${fcid} .data-govern-form .data-govern-col[style="padding-left: 12px; padding-right: 12px;`,
    );
    spanCols.forEach((ele, index) => {
      if (ele && domList[index]) {
        domList[index].className = domList[index].className.replace(
          /data\-govern\-col-(\d)+/g,
          `data-govern-col-${ele.toFixed(0)}`,
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spanCols.join()]);
};
