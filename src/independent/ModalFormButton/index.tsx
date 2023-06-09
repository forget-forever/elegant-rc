import { useMemoizedFn } from 'ahooks';
import type { FormProps } from 'antd';
import { Button, Form } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import type { GetIProps, MyOmit } from 'elegant-rc';

import ModalConfirm from '../ModalConfirm';

const ModalFormButton = <T,>(
  props: {
    /** 表单 */
    children?: GetIProps<typeof Form>['children'];
    /** 按钮节点， 如果不传会自动使用Button组件 */
    buttonNode?: JSX.Element;
    /** 提交的时候执行的回调 */
    onSubmit?: (val: T, form: FormInstance<T>) => Promise<void> | void;
    /**
     * 如果buttonNode不传，默认的button需要什么内容
     * @default '确定'
     */
    buttonText?: React.ReactNode;
    /**
     * 如果buttonNode不传，默认的button需要什么type
     * @default 'primary'
     */
    buttonType?: GetIProps<typeof Button>['type'];
    /** form表单的props */
    formProps?: FormProps<T>;
    /**
     * form表单的渲染布局
     * @default "horizontal"
     */
    formLayout?: GetIProps<typeof Form>['layout'];
    /**
     * 如果buttonNode不传，默认的button的size
     */
    buttonSize?: GetIProps<typeof Button>['size'];
    /**
     * 如果buttonNode不传，默认的button的disabled
     */
    buttonDisabled?: boolean;
    /**
     * 阻止onSubmit之后重置表单
     */
    preventResetForm?: boolean;
    /**
     * 在关闭弹窗的时候，重置表单
     */
    resetFormOnClose?: boolean;
  } & MyOmit<GetIProps<typeof ModalConfirm>, 'onSubmit' | 'children'>,
) => {
  const {
    children,
    onSubmit,
    onCancel,
    buttonNode,
    buttonText = '提交',
    formProps,
    formLayout = 'horizontal',
    buttonType = 'primary',
    buttonSize,
    buttonDisabled,
    preventResetForm,
    resetFormOnClose,
    ...resetProps
  } = props;

  const [formRef] = useForm<T>();

  const submitHandle = useMemoizedFn(async () => {
    const formRes = formProps?.form || formRef;
    await formRes.validateFields();
    const val = formRes.getFieldsValue();
    const res = onSubmit?.(val, formRef);
    /** 如果说要销毁，那就不用管了，别重置 */
    if (!preventResetForm) {
      await res;
      formRef.resetFields();
    }
    return res;
  });

  /**
   * 取消事件的处理方法
   */
  const onCancelHandle = useMemoizedFn(() => {
    const res = onCancel?.();
    const doCancel = () => {
      if (resetFormOnClose) {
        const formRes = formProps?.form || formRef;
        formRes.resetFields();
      }
    };
    if (res instanceof Promise) {
      res.then(() => {
        doCancel();
      });
    } else {
      doCancel();
    }
    return res;
  });

  return (
    <ModalConfirm
      onSubmit={submitHandle}
      onCancel={onCancelHandle}
      title={buttonText}
      tipText={
        <Form form={formRef} layout={formLayout} {...formProps}>
          {children}
        </Form>
      }
      {...resetProps}
    >
      {buttonNode || (
        <Button type={buttonType} size={buttonSize} disabled={buttonDisabled}>
          {buttonText}
        </Button>
      )}
    </ModalConfirm>
  );
};

export default ModalFormButton;
