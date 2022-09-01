import { useBoolean } from 'ahooks';
import { Popover } from 'antd';
import React from 'react';
import type { GetIProps } from 'tc-rc';

export type RenderContentType = (config: {
  /** 打开这个popover的方法 */
  open: () => void;
  /** 关闭这个popover的方法 */
  close: () => void;
  /** 如果你传了content节点，这里会透传过来 */
  content?: React.ReactNode;
}) => React.ReactNode;

const PopoverButton: React.FC<
  {
    /** 渲染内容的方法，会把关闭开启方法透传过来 */
    renderContent?: RenderContentType;
  } & GetIProps<typeof Popover>
> = (props) => {
  const { renderContent, children, content, ...resetProps } = props;
  const [visible, { setFalse: close, setTrue: open, set: change }] =
    useBoolean(false);

  const resContent = content ?? renderContent?.({ close, open, content });

  return (
    <Popover
      content={resContent}
      visible={visible}
      onVisibleChange={change}
      {...resetProps}
    >
      {children}
    </Popover>
  );
};

export default PopoverButton;
