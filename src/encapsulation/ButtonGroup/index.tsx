/*
 * @Author: zml
 * @Date: 2022-06-02 15:34:24
 * @LastEditTime: 2022-07-26 19:09:39
 */

import ButtonAsync from '../ButtonAsync';
import type { FCProps, GetIProps } from '../../types';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

const ButtonGroup: FCProps<{
  style?: CSSProperties;
  /** 取消事件 */
  onCancel?: () => Promise<void> | void;
  /** 确定事件 */
  onSubmit?: () => Promise<void> | void;
  /** 取消的文字 */
  cancelText?: React.ReactNode;
  /** 确定的文字 */
  submitText?: React.ReactNode;
  /** 两个按钮的间隙 */
  gap?: CSSProperties['gap'];
  /** 俩按钮统一的style */
  buttonStyle?: CSSProperties;
  /** 确定按钮透传的参数 */
  submitProps?: GetIProps<typeof ButtonAsync>;
  /** 取消按钮偷传的参数 */
  cancelProps?: GetIProps<typeof ButtonAsync>;
}> = (props) => {
  const {
    cancelText = '取消',
    submitText = '确定',
    onCancel,
    onSubmit,
    gap = '20px',
    style,
    buttonStyle,
    submitProps,
    cancelProps,
  } = props;

  const styles = useMemo(() => {
    return {
      containerStyle: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        gap,
        ...style,
      },
      buttonStyle: { width: '140px', height: '36px', ...buttonStyle },
    };
  }, [buttonStyle, gap, style]);

  return (
    <div style={styles.containerStyle}>
      <ButtonAsync
        style={styles.buttonStyle}
        onClick={onCancel}
        {...cancelProps}
      >
        {cancelText}
      </ButtonAsync>
      <ButtonAsync
        type="primary"
        style={styles.buttonStyle}
        onClick={onSubmit}
        {...submitProps}
      >
        {submitText}
      </ButtonAsync>
    </div>
  );
};

export default ButtonGroup;
