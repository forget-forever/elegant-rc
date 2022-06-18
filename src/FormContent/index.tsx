/*
 * @Author: zml
 * @Date: 2022-06-06 13:29:04
 * @LastEditTime: 2022-06-14 19:49:45
 */
import { FCProps, GetIProps } from '@/types';
import { Col, Form } from 'antd';
import { CSSProperties, useMemo } from 'react';

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
  const { children, span, style, itemStyle, required, rules, ...itemProps } =
    props;

  const rulesConf = useMemo(() => {
    const res = rules || [];
    if (required) {
      res.push({ message: `${props.label}不能为空`, required });
    }
    return res;
  }, [props.label, required, rules]);

  return (
    <Col span={span} style={style}>
      <Form.Item rules={rulesConf} {...itemProps} style={itemStyle}>
        {children}
      </Form.Item>
    </Col>
  );
};

export default FormContent;
