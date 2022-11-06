/*
 * @Author: zml
 * @Date: 2022-06-20 20:14:45
 * @LastEditTime: 2022-06-29 20:20:47
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { CodeInput } from 'elegant-rc';

export default () => {
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
          str: "select count(1) as `总单量` from dts.dwd_fact_order_whole where 1 = 1  and edt between '20220619' and '20220619';",
        }}
      >
        <CodeInput valueType="obj" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form>
  );
};
