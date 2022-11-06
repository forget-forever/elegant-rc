/*
 * @Author: zml
 * @Date: 2022-06-13 14:01:28
 * @LastEditTime: 2022-07-04 14:51:32
 */
import type { SubmitterProps } from '@ant-design/pro-form';
import { useMemoizedFn } from 'ahooks';
import type { FormInstance } from 'antd';
import { Space } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { ButtonGroup } from 'elegant-rc';

type Config = {
  /** 确定按钮的文字 */
  submitText?: string;
  /** 取消按钮的文字 */
  cancelText?: string;
  /** 取消按钮要触发的方法 */
  onCancel?: () => void;
  /** 按钮容器的外边距 */
  margin?: CSSProperties['margin'];
  /**
   * 按钮容器的内边距
   * @default 20px
   */
  padding?: CSSProperties['padding'];
  /** 给外层添加的style样式 */
  style?: CSSProperties;
};
const buttonGroupStyle: CSSProperties = {
  width: '140px',
  height: '36px',
};

/**
 * 使用ProForm的时候的submitter的自定义hook，修复默认的一些布局问题
 * @param config 配置的方法
 * @returns submitter的配置对象
 */
const useProFormSubmitter = function <FormType = unknown>(config?: Config) {
  const {
    submitText = '提交',
    cancelText = '取消',
    onCancel,
    style,
    margin,
    padding = '20px',
  } = config || {};

  const cancelHandle = useMemoizedFn(() => {
    onCancel?.();
  });

  return useMemo<
    SubmitterProps<{
      form?: FormInstance<FormType> | undefined;
    }>
  >(
    () => ({
      submitButtonProps: { style: buttonGroupStyle },
      searchConfig: { submitText },
      render: (_, dom) => (
        <Space size={20} style={{ padding, margin, display: 'flex', ...style }}>
          <ButtonGroup
            cancelText={cancelText}
            onCancel={cancelHandle}
            submitProps={{ style: { display: 'none' } }}
          />
          {dom[1]}
        </Space>
      ),
    }),
    [submitText, padding, margin, style, cancelText, cancelHandle],
  );
};

export default useProFormSubmitter;
