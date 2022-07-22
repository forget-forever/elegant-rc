/*
 * @Author: zml
 * @Date: 2022-06-15 20:20:02
 * @LastEditTime: 2022-07-22 10:56:43
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Card, Form } from 'antd';
import { TagsInput } from 'tc-rc';

export default () => {
  const onSearch = useMemoizedFn((val: string) => {
    const res = +val;
    if (!Number.isNaN(res) && val) {
      return [{ label: res.toString(), value: res.toString() }];
    } else {
      return [];
    }
  });

  const onSearchEmail = useMemoizedFn((val: string) => {
    const emails = ['qq.com', '163.com', '139.com'];
    if (/.*@.*/.test(val)) {
      return [{ value: val, label: val }];
    }
    return emails.map((item) => ({
      value: `${val}@${item}`,
      label: `${val}@${item}`,
    }));
  });

  const onFinish = useMemoizedFn((val) => {
    alert(JSON.stringify(val));
  });

  return (
    <>
      <Card title="号码输入">
        <Form onFinish={onFinish}>
          <Form.Item name="tags" label="电话号码">
            <TagsInput onSearch={onSearch} placeholder="请输入电话号码" />
          </Form.Item>
          <Button htmlType="submit">确定</Button>
        </Form>
      </Card>
      <Card title="其他">
        <Form onFinish={onFinish}>
          <Form.Item name="tags" label="邮箱">
            <TagsInput mode="multiple" onSearch={onSearchEmail} />
          </Form.Item>
          <TagsInput
            name="phone"
            label="电话"
            mode="multiple"
            placeholder="请输入电话号码"
            onSearch={onSearch}
          />
          <Button htmlType="submit">确定</Button>
        </Form>
      </Card>
    </>
  );
};
