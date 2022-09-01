import { useBoolean } from 'ahooks';
import React from 'react';
import type { GetIProps } from 'tc-rc';
import { ModalContent } from '../../encapsulation';

export type RenderModalContentType = (config: {
  /** 弹窗的现实隐藏状态 */
  visible: boolean;
  /** 关闭弹窗的方法 */
  close: () => void;
  /** 打开弹窗的方法 */
  open: () => void;
}) => React.ReactNode;

/**
 * 弹窗按钮组件，将按钮和弹窗放在一起
 * @param props
 * @returns
 */
const LevelConfig: React.FC<
  {
    /** 这个组件的配置与Modal配置相似，但是children是用于点击的节点的，modal弹窗需要展示的节点需要用这个属性展示 */
    renderModalContent?: RenderModalContentType;
  } & GetIProps<typeof ModalContent>
> = (props) => {
  const { children, renderModalContent, ...resetProps } = props;
  const [visible, { setFalse, setTrue }] = useBoolean(false);

  const content = renderModalContent?.({
    visible,
    close: setFalse,
    open: setTrue,
  });

  return (
    <>
      <span onClick={setTrue}>{children}</span>
      <ModalContent visible={visible} onCancel={setFalse} {...resetProps}>
        {content}
      </ModalContent>
    </>
  );
};

export default LevelConfig;
