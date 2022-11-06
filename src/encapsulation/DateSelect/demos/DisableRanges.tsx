/*
 * @Author: zml
 * @Date: 2022-06-23 14:08:50
 * @LastEditTime: 2022-06-28 10:53:58
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Card, Form } from 'antd';
import moment from 'moment';
import { DateSelect } from 'elegant-rc';

const disList = [
  [moment().subtract(7, 'days'), moment().subtract(3, 'days')] as [
    moment.Moment,
    moment.Moment,
  ],
  undefined,
];

export default () => {
  const onFinish = useMemoizedFn((val) => {
    alert(JSON.stringify(val));
  });

  return (
    <Card title="屏蔽日期段">
      <Form onFinish={onFinish}>
        <Form.Item name="date1" label="选择日期">
          <DateSelect dataLength={9} includeToday disabledRanges={disList} />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          确定
        </Button>
      </Form>
    </Card>
  );
};
