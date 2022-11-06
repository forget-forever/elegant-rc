/*
 * @Author: zml
 * @Date: 2022-06-29 11:23:17
 * @LastEditTime: 2022-07-25 12:50:32
 */
import { useMemoizedFn } from 'ahooks';
import { Button, Form } from 'antd';
import { SelectControl } from 'elegant-rc';

const valueEnum = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
};
export default () => {
  const finishHandle = useMemoizedFn((val: { val: unknown }) => {
    alert(val.val);
  });

  return (
    <Form onFinish={finishHandle}>
      <Form.Item name="val">
        <SelectControl
          valueEnum={valueEnum}
          maxCount={2}
          mode="multiple"
          disabledList={[1]}
        />
      </Form.Item>
      <Button htmlType="submit">确定</Button>
    </Form>
  );
};
