/*
 * @Author: zml
 * @Date: 2022-06-23 14:08:50
 * @LastEditTime: 2022-06-28 10:55:17
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Card, Form } from 'antd';
import { DateSelect } from 'elegant-rc';

export default () => {
  const onFinish = useMemoizedFn((val) => {
    alert(JSON.stringify(val));
  });

  return (
    <Card title="限制选择日期的长度">
      <Form onFinish={onFinish}>
        <Form.Item name="date1" label="选择日期">
          <DateSelect dataLength={9} includeToday />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          确定
        </Button>
      </Form>
    </Card>
  );
};
