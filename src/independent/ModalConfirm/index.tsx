import { useBoolean, useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';
import React, { cloneElement, isValidElement } from 'react';
import type { GetIProps, MyOmit } from 'elegant-rc';
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
    /**
     * 当onSubmit完成之后阻止自动关闭弹窗
     * @default false
     */
    disabledAutoClose?: boolean;
    /**
     * 打开弹窗拦截，如果返回的是true，或者promise.resolve()就会打开弹窗，不传这个，就会忽略拦截
     */
    openModalIntercept?: () => boolean | Promise<void>;
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
    disabledAutoClose,
    openModalIntercept,
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
      const doClick = () => {
        setTrue();
      };
      if (openModalIntercept) {
        const sigOpen = openModalIntercept();
        /** 是promise */
        if (sigOpen instanceof Promise) {
          return sigOpen.then(() => {
            return doClick();
          });
        } else {
          /** 不是promise就判断返回的逻辑真假 */
          if (sigOpen) {
            return doClick();
          }
        }
      } else {
        return doClick();
      }
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
          if (!disabledAutoClose) {
            setFalse();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      if (!disabledAutoClose) {
        setFalse();
      }
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

  // let modalNode = tipText;
  // if (isValidElement(modalNode)) {
  //   modalNode = cloneElement(modalNode, {
  //     closeModal: setFalse,

  //   })
  // }

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
        open={visible}
        {...resetProps}
      >
        {tipText}
      </Modal>
    </>
  );
};

export default ModalConfirmButton;
