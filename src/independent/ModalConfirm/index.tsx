import { useBoolean, useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';
import React, { cloneElement } from 'react';
import type { GetIProps, MyOmit } from 'tc-rc';
import ButtonAsync from '../../encapsulation/ButtonAsync';

/**
 *
 * @param props
 * @returns
 */
const ModalConfirmButton: React.FC<
  {
    /** 确定的时候要执行的事件 */
    onSubmit?: () => void | Promise<void>;
    /** 展示的文案 */
    tipText?: React.ReactNode;
    /** 会给children注入一个onClick事件, 如果设置如果children中没有disabled属性，那么还会将disabledModal属性注入 */
    children: JSX.Element;
    /**
     * 是否要屏蔽modal的打开关闭, 如果传的是true，那么modal的展示效果会失效
     * @default false
     */
    disabledModal?: boolean;
    /**
     * 取消的时候的统一处理事件，如果设置如果children中没有disabled属性，那么还会将disabledModal属性注入
     */
    onCancel?: () => void | Promise<void>;
  } & MyOmit<GetIProps<typeof Modal>, 'children' | 'onCancel'>
> = (props) => {
  const {
    children,
    disabledModal,
    tipText,
    onSubmit,
    onCancel,
    cancelText = '取消',
    okText = '确定',
    okButtonProps,
    cancelButtonProps,
    ...resetProps
  } = props;

  const [visible, { setFalse, setTrue }] = useBoolean(false);

  const {
    /** children的节点的props */
    props: propsChild = {},
  } = children || {};

  /**
   * 给children节点注入click事件
   */
  const childrenClick = useMemoizedFn((e) => {
    /** 如果被屏蔽了，那就不要做什么事了 */
    if (!disabledModal) {
      setTrue();
      propsChild?.onClick?.(e);
    }
  });

  const { disabled = disabledModal } = propsChild;

  /**
   * 重新生成children节点
   */
  const childrenResNode = cloneElement(children, {
    ...propsChild,
    disabled,
    onClick: childrenClick,
  });

  /**
   * 确定函数的处理方法
   */
  const onOkHandle = useMemoizedFn(() => {
    const res = onSubmit?.();
    if (res instanceof Promise) {
      res
        .then(() => {
          setFalse();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setFalse();
    }
    return res;
  });

  /**
   * 取消事件的处理方法
   */
  const onCancelHandle = useMemoizedFn(() => {
    const res = onCancel?.();
    if (res instanceof Promise) {
      res.then(() => {
        setFalse();
      });
    } else {
      setFalse();
    }
    return res;
  });

  return (
    <>
      {childrenResNode}
      <Modal
        footer={[
          <ButtonAsync
            key="cancel"
            {...cancelButtonProps}
            onClick={onCancelHandle}
          >
            {cancelText}
          </ButtonAsync>,
          <ButtonAsync
            type="primary"
            key="ok"
            {...okButtonProps}
            onClick={onOkHandle}
          >
            {okText}
          </ButtonAsync>,
        ]}
        onCancel={onCancelHandle}
        visible={visible}
        {...resetProps}
      >
        {tipText}
      </Modal>
    </>
  );
};

export default ModalConfirmButton;
