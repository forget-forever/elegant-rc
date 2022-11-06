/*
 * @Author: zml
 * @Date: 2022-06-29 11:23:17
 * @LastEditTime: 2022-06-29 12:21:47
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { SelectControl } from 'elegant-rc';

const options = [
  { value: 1, label: '选项一' },
  { value: 2, label: '选项二' },
  { value: 3, label: '选项三' },
  { value: 4, label: '选项四' },
  { value: 5, label: '选项五' },
  { value: 6, label: '选项六' },
];
export default () => {
  const finishHandle = useMemoizedFn((val: { val: unknown }) => {
    alert(val.val);
  });

  return (
    <Form onFinish={finishHandle}>
      <Form.Item name="val">
        <SelectControl options={options} maxCount={2} mode="multiple" />
      </Form.Item>
      <Button htmlType="submit">确定</Button>
    </Form>
  );
};
