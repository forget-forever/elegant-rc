/*
 * @Author: zml
 * @Date: 2022-06-20 20:14:45
 * @LastEditTime: 2022-06-28 15:18:45
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { CodeInput } from 'tc-rc';

export default () => {
  const onFinish = useMemoizedFn((val: { code: string }) => {
    alert(val.code);
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="code" label="代码" initialValue="var a = 1">
        <CodeInput codeSelect={['javascript', 'python']} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form>
  );
};
