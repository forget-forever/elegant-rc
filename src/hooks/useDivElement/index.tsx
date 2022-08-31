import { useMount } from 'ahooks';
import React, { useRef } from 'react';

const useDivElement = (
  options?: {
    /**
     * div节点初始化之后执行的回调
     * @param e 创建出的dom节点实例
     */
    afterMount?: (e: HTMLDivElement) => void;
  } & React.HTMLAttributes<{}>,
) => {
  const { afterMount, ...resetOptions } = options || {};
  const divRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (divRef.current) {
      afterMount?.(divRef.current);
    }
  });

  const Node = <div {...resetOptions} ref={divRef} />;

  return {
    /** div元素的节点所在的节点，需要render会渲染 */
    Node,
    /** dom节点 */
    ref: divRef,
  };
};

export default useDivElement;
