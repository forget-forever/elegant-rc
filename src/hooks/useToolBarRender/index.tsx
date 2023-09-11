import type { ActionType } from '@ant-design/pro-table';
import { useMemoizedFn } from 'ahooks';
import type { FormInstance } from 'antd';
import type React from 'react';
import { useRef } from 'react';

/**
 * proTable使用导TooBar
 * @param extraDom 多余的节点建议节点写上key
 * @returns 返回toolBarRender和formRef两个配置项，如果别的地方需要用formRef那就解构出来用
 */
const useToolBarRender = <T,>(
  extraDom: (
    | ((
        actionRef?: ActionType,
        formRef?: React.MutableRefObject<FormInstance<T> | undefined>,
      ) => React.ReactNode)
    | React.ReactNode
  )[] = [],
) => {
  const formRef = useRef<FormInstance<T>>();

  const toolRender = useMemoizedFn((actionRef?: ActionType) => [
    ...extraDom.map((ele) => {
      if (typeof ele === 'function') {
        return ele(actionRef, formRef);
      }
      return ele;
    }),
  ]);

  return {
    formRef,
    toolBarRender: toolRender,
  };
};

export default useToolBarRender;
