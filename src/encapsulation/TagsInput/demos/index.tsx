/*
 * @Author: zml
 * @Date: 2022-06-15 20:20:02
 * @LastEditTime: 2022-06-15 20:32:04
 */
import { useMemoizedFn } from 'ahooks';
import { Card, Form } from 'antd';
import { TagsInput } from 'tc-rc';

export default () => {
  const onSearch = useMemoizedFn((val: string) => {
    const res = +val;
    if (!Number.isNaN(res)) {
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

  return (
    <>
      <Card title="普通文本">
        <Form>
          <Form.Item name="tags" label="电话号码">
            <TagsInput />
          </Form.Item>
        </Form>
      </Card>
      <Card title="号码输入">
        <Form>
          <Form.Item name="tags" label="电话号码">
            <TagsInput onSearch={onSearch} />
          </Form.Item>
        </Form>
      </Card>
      <Card title="邮箱输入">
        <Form>
          <Form.Item name="tags" label="电话号码">
            <TagsInput mode="multiple" onSearch={onSearchEmail} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
