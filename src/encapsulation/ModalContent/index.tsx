/*
 * @Author: zml
 * @Date: 2022-05-31 20:37:58
 * @LastEditTime: 2022-06-23 13:03:31
 */
import { useSize } from 'ahooks';
import { Modal } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo, useRef } from 'react';
import { FCProps, GetIProps } from 'tc-rc';

const headerHeight = 55;
type IProps = GetIProps<typeof Modal> & {
  /** 浮层距顶部的高度，为数字的时候单位是px, 如果没有这个会根据contentHeight计算应该下降多少 */
  topHeight?: number | string;
  /**
   * 浮层的上下空白区比值，建议小于1
   * @default 0.618
   */
  maskRatio?: number;
};
const ModalContent: FCProps<IProps> = (props) => {
  const {
    children,
    maskRatio = 0.618,
    topHeight: topHeightSelf,
    title = '',
    ...resetProps
  } = props;
  const { bodyStyle } = props;

  const childRef = useRef<HTMLDivElement>(null);
  // 获取窗体的高度
  const { height: clientHeight } =
    useSize(document.querySelector('body')) || {};
  const { height: childHeight } = useSize(childRef) || {};
  // 需要有上下24的padding
  const contentHeight = (childHeight || 0) + 48;

  const topHeight = useMemo(() => {
    if (topHeightSelf !== undefined) {
      return topHeightSelf;
    }
    if (clientHeight) {
      // 需要加上的height的高度
      const resetHeight = clientHeight - contentHeight - headerHeight;
      if (resetHeight < 200) {
        return 100;
      }
      return resetHeight / 2;
    }
    return 100;
  }, [clientHeight, contentHeight, topHeightSelf]);

  const { contentStyle, style } = useMemo<
    Record<'contentStyle' | 'style', CSSProperties>
  >(() => {
    let maxHeight = `calc(100vh - ${headerHeight}px - ${topHeight} - ${topHeight})`;
    let top = topHeight.toString();
    if (typeof topHeight === 'number') {
      maxHeight = `calc(100vh - ${2 * topHeight + headerHeight}px)`;
      top = `${topHeight * maskRatio}px`;
    }
    return {
      contentStyle: {
        maxHeight,
        overflowY: 'auto',
        height: contentHeight,
        textAlign: 'start',
        ...bodyStyle,
      },
      style: { top, textAlign: 'center', ...props.style },
    };
  }, [bodyStyle, contentHeight, maskRatio, props.style, topHeight]);

  return (
    <Modal
      width={800}
      footer={null}
      title={title}
      {...resetProps}
      style={style}
      bodyStyle={contentStyle}
    >
      <div ref={childRef}>{children}</div>
    </Modal>
  );
};

export default ModalContent;
