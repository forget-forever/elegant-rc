import { useMemoizedFn } from 'ahooks';
import { Card, Form } from 'antd';
import { CronSelect, ButtonAsync } from 'tc-rc';

export default () => {
  const onFinish = useMemoizedFn((val: { cron: string }) => {
    alert(JSON.stringify(val, null, 4));
  });

  return (
    <Card title="cron选择器">
      <Form onFinish={onFinish}>
        <Form.Item label="cron选择" name="cron">
          <CronSelect />
        </Form.Item>
        <ButtonAsync type="primary" htmlType="submit">
          提交
        </ButtonAsync>
      </Form>
    </Card>
  );
};
