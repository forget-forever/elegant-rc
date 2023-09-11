import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import type { EditTableColumns } from 'elegant-rc';
import { EditTable } from 'elegant-rc';

type RecordItem = {
  name: string;
  age: string;
  gender: string;
  disabled?: boolean;
};

const columns: EditTableColumns<RecordItem>[] = [
  { dataIndex: 'name', title: '姓名', required: true },
  { dataIndex: 'age', title: '年龄', required: true },
  {
    dataIndex: 'gender',
    title: '性别',
    valueEnum: {
      male: '男',
      female: '女',
      secret: '保密',
    },
  },
];

export default () => {
  const onFinish = useMemoizedFn((val) => {
    console.log(val);
    alert('输出请看控制台');
  });

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="msg" label="信息">
        <EditTable.EditTableSym basicName={['msg']} columns={columns} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form>
  );
};
