/*
 * @Author: zml
 * @Date: 2022-06-21 16:23:06
 * @LastEditTime: 2022-07-06 18:57:25
 */
import React from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { Col } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { noPaddingStyle } from 'elegant-rc';

const containerStyle: CSSProperties = {
  ...noPaddingStyle,
  color: 'var(--antd-wave-shadow-color)',
  display: 'flex',
  alignItems: 'center',
  fontSize: 20,
};
/**
 * 数量控制组件
 * @param props
 * @returns
 */
const NumControl: React.FC<{
  /** 所在的数组坐标，这个可以判断是不是要有加号 */
  index: number;
  /** 添加操作 */
  add: () => void;
  /**
   * 删除一行操作, 如果不传，那么就会隐藏减号
   */
  remove?: (idnex: number | number[]) => void;
  /** 是否隐藏加号 */
  hideAdd?: boolean;
  /**
   * 是否可以删除
   * @default true
   */
  canRemove?: boolean;
  /**
   * 占用的格子
   * @default 2
   */
  span?: number;
  /**
   * 外层的样式
   */
  style?: CSSProperties;
}> = (props) => {
  const {
    hideAdd,
    add,
    remove,
    index,
    span = 2,
    canRemove = true,
    style,
  } = props;

  const removeHandle = useMemoizedFn(() => {
    if (canRemove && remove) {
      remove(index);
    }
  });

  const styleConfig = useMemo(
    () => ({
      ...containerStyle,
      ...style,
    }),
    [style],
  );

  return (
    <Col style={styleConfig} span={span}>
      {!hideAdd && index === 0 && (
        <PlusCircleOutlined onClick={add} style={{ marginRight: '6px' }} />
      )}
      {remove && <MinusCircleOutlined onClick={removeHandle} />}
    </Col>
  );
};

export default NumControl;
