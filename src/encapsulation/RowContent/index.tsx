/*
 * @Author: zml
 * @Date: 2022-07-05 17:15:49
 * @LastEditTime: 2022-07-05 17:20:54
 */
import type { RowProps } from 'antd';
import { Row } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

const rowGapDefault = 24;
const rowProps: RowProps = {
  gutter: [24, rowGapDefault],
};

/**
 * 封装好的Row组件，将一些常用样式封入style
 * @param props
 * @returns
 */
const RowContent: React.FC<
  RowProps & {
    /**
     * 需要设置的内边距
     * @default 0
     */
    padding?: CSSProperties['padding'];
    /**
     * 行间距
     * @default 24
     */
    rowGap?: CSSProperties['rowGap'];
  }
> = (props) => {
  const {
    children,
    style,
    padding = 0,
    rowGap = rowGapDefault,
    ...resetProps
  } = props;

  const styleHandle = useMemo(
    () => ({
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      padding,
      rowGap,
      ...style,
    }),
    [padding, style, rowGap],
  );

  return (
    <Row {...rowProps} {...resetProps} style={styleHandle}>
      {children}
    </Row>
  );
};

export default RowContent;
