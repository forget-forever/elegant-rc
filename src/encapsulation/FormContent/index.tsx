/*
 * @Author: zml
 * @Date: 2022-06-06 13:29:04
 * @LastEditTime: 2022-06-23 19:35:14
 */
import { Col, Form } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import type { FCProps, GetIProps, MyOmit } from 'tc-rc';

const FormContent: FCProps<
  MyOmit<GetIProps<typeof Form.Item>, 'required'> & {
    /**
     * 是否必须，如果传了这个之后就会自动添加rule，如果required是字符串，会写入message
     */
    required?: boolean | string;
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
      let message = `${props.label || '该字段'}不能为空`;
      if (typeof required === 'string') {
        message = required;
      }
      res.push({ message, required: true });
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
