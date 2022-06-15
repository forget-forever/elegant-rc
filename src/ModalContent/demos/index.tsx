/*
 * @Author: zml
 * @Date: 2022-06-15 20:37:41
 * @LastEditTime: 2022-06-15 20:49:34
 */
import { useBoolean, useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Card } from 'antd';
import { ModalContent } from 'tc-rc';

export default () => {
  const [visible, { setFalse: close, setTrue: open }] = useBoolean(false);

  const [height, setHeight] = useSafeState(400);

  const addHeight = useMemoizedFn(() => setHeight((old) => old + 100));

  const subHeight = useMemoizedFn(() =>
    setHeight((old) => {
      const res = old - 100;
      if (res < 80) {
        return 80;
      }
      return res;
    }),
  );

  return (
    <Card title="与modal用法一致">
      <Button type="primary" onClick={open}>
        打开弹窗
      </Button>
      <ModalContent onCancel={close} title="样例弹窗" visible={visible}>
        <div
          style={{
            border: '5px solid #f00',
            width: '100%',
            height,
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          <Button type="primary" onClick={addHeight}>
            高度加100
          </Button>
          &nbsp;&nbsp;
          <Button onClick={subHeight}>高度减100</Button>
        </div>
      </ModalContent>
    </Card>
  );
};
