import { useBoolean, useMemoizedFn } from 'ahooks';
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
    /**
     * 是否要屏蔽popover的打开关闭, 如果传的是true，那么popover的展示效果会失效
     * @default false
     */
    disabledPopover?: boolean;
  } & GetIProps<typeof Popover>
> = (props) => {
  const {
    renderContent,
    children,
    content,
    disabledPopover = false,
    ...resetProps
  } = props;
  const [visible, { setFalse: close, setTrue: open, set: change }] =
    useBoolean(false);

  const changeHandle = useMemoizedFn((sig: boolean) => {
    if (!disabledPopover) {
      change(sig);
    }
  });

  const resContent = content ?? renderContent?.({ close, open, content });

  return (
    <Popover
      content={resContent}
      visible={visible}
      onVisibleChange={changeHandle}
      {...resetProps}
    >
      {children}
    </Popover>
  );
};

export default PopoverButton;
