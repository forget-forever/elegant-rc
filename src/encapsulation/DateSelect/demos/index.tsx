/*
 * @Author: zml
 * @Date: 2022-06-23 14:08:50
 * @LastEditTime: 2022-06-23 14:17:04
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { DateSelect } from 'tc-rc';

export default () => {
  const onFinish = useMemoizedFn((val) => {
    alert(JSON.stringify(val));
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="date1" label="选择日期">
        <DateSelect dataLength={9} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        确定
      </Button>
    </Form>
  );
};
