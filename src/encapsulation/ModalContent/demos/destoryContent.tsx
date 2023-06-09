import { useBoolean, useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Card, Form, InputNumber } from 'antd';
import ModalContent from '..';

export default () => {
  const [ratio, setRatio] = useSafeState(0.618);
  const [visible, { setFalse: close, setTrue: open }] = useBoolean(false);

  const onSubmit = useMemoizedFn((val: { val: number }) => {
    setRatio(Number(val.val));
  });

  return (
    <Card title="销毁元素">
      <Button type="primary" onClick={open}>
        打开弹窗
      </Button>
      <ModalContent
        open={visible}
        onCancel={close}
        title="弹窗样例"
        maskRatio={ratio}
        destroyOnClose
      >
        <div
          style={{
            border: '5px solid #f00',
            width: '100%',
            height: 10000,
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          <Form onFinish={onSubmit}>
            <Form.Item name="val" label="蒙版上下比例">
              <InputNumber placeholder="输入数字调节上下比例" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form>
        </div>
      </ModalContent>
    </Card>
  );
};
