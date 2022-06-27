/*
 * @Author: zml
 * @Date: 2022-06-23 14:08:50
 * @LastEditTime: 2022-06-27 20:06:18
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import moment from 'moment';
import { DateSelect } from 'tc-rc';

const disList = [
  [moment('2022-05-01 00:00:00'), moment('2022-05-06 00:00:00')] as [
    moment.Moment,
    moment.Moment,
  ],
];

export default () => {
  const onFinish = useMemoizedFn((val) => {
    alert(JSON.stringify(val));
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="date1" label="选择日期">
        <DateSelect dataLength={9} includeToday disabledRanges={disList} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        确定
      </Button>
    </Form>
  );
};
