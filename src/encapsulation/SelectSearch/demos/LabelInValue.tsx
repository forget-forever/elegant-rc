import { Button, Form } from 'antd';
import type { IOptions } from 'elegant-rc';
import { SelectSearch } from 'elegant-rc';

const getList = (val: string) => {
  return new Promise<{ value: number; label: string }[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 8 }).map((_i, i) => ({
          value: i,
          label: `${val}${i + 1}`,
        })),
      );
    }, 1000);
  });
};

export default () => {
  const [form] = Form.useForm<{ search: IOptions }>();

  const val = Form.useWatch('search', form);

  console.log(val);

  return (
    <Form
      form={form}
      onFinish={(val) => {
        console.log(val, 'submit value');
      }}
      initialValues={{ search: { value: 1, label: 'aa' } }}
    >
      <Form.Item name="search">
        <SelectSearch labelInValue onRequest={getList} />
      </Form.Item>
      <Button htmlType="submit">确定</Button>
    </Form>
  );
};
