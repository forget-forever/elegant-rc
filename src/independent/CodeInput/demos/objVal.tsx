/*
 * @Author: zml
 * @Date: 2022-06-20 20:14:45
 * @LastEditTime: 2022-06-20 20:26:03
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { CodeInput } from 'elegant-rc';

export default () => {
  const onFinish = useMemoizedFn((val: { code: string }) => {
    alert(JSON.stringify(val.code, null, 4));
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="code"
        label="代码"
        initialValue={{ lang: 'javascript', str: 'var a = 1' }}
      >
        <CodeInput valueType="obj" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form>
  );
};
