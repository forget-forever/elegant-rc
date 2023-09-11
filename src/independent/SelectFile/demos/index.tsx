import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import type { RcFile } from 'antd/lib/upload';

import { SelectFile } from 'elegant-rc';

export default () => {
  const onSubmit = useMemoizedFn((val: { file: RcFile }) => {
    alert('看控制台输出结果');
    console.log(val);
  });
  return (
    <Form onFinish={onSubmit}>
      <Form.Item name="file" label="文件">
        <SelectFile />
      </Form.Item>
      <Button htmlType="submit">确定</Button>
    </Form>
  );
};
