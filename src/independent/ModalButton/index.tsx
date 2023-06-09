import { useBoolean, useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';
import React from 'react';
import type { GetIProps } from 'elegant-rc';

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
    /**
     * 是否要屏蔽modal的打开关闭, 如果传的是true，那么modal的展示效果会失效
     * @default false
     */
    disabledModal?: boolean;
  } & GetIProps<typeof Modal>
> = (props) => {
  const {
    children,
    renderModalContent,
    disabledModal = false,
    ...resetProps
  } = props;
  const [visible, { setFalse, setTrue }] = useBoolean(false);

  const content = renderModalContent?.({
    visible,
    close: setFalse,
    open: setTrue,
  });

  const openModalHandle = useMemoizedFn(() => {
    if (!disabledModal) {
      setTrue();
    }
  });

  return (
    <>
      <span onClick={openModalHandle}>{children}</span>
      <Modal
        width={800}
        footer={null}
        open={visible}
        onCancel={setFalse}
        {...resetProps}
      >
        {content}
      </Modal>
    </>
  );
};

export default LevelConfig;
