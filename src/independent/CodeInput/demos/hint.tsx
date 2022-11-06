/*
 * @Author: zml
 * @Date: 2022-07-13 13:49:02
 * @LastEditTime: 2022-07-13 14:04:00
 */
import { useMemoizedFn, useRequest } from 'ahooks';
import { Button, Form } from 'antd';
import { CodeInput } from 'elegant-rc';

const getHints = () =>
  new Promise<Record<string, (string | number)[]>>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        t0: [1, 'b', 'c', 'd'],
      });
    }, 3000);
  });

export default () => {
  const { data: hints } = useRequest(getHints);

  const onFinish = useMemoizedFn((val: { code: string }) => {
    alert(val.code);
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="code"
        label="代码"
        initialValue={{
          lang: 'sql',
        }}
      >
        <CodeInput valueType="obj" hintMap={hints} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form>
  );
};
