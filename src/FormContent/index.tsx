/*
 * @Author: zml
 * @Date: 2022-06-06 13:29:04
 * @LastEditTime: 2022-06-06 13:29:18
 */
import { FCProps, GetIProps } from '@/public';
import { Col, Form } from 'antd';
import type { CSSProperties } from 'react';

const FormContent: FCProps<
  GetIProps<typeof Form.Item> & {
    /**
     * 栅格
     */
    span?: GetIProps<typeof Col>['span'];
    /** Form.Item 的样式 */
    itemStyle?: CSSProperties;
  }
> = (props) => {
  const { children, span, style, itemStyle, ...itemProps } = props;

  return (
    <Col span={span} style={style}>
      <Form.Item {...itemProps} style={itemStyle}>
        {children}
      </Form.Item>
    </Col>
  );
};

export default FormContent;
