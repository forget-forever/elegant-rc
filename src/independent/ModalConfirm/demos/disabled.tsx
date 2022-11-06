import { useMemoizedFn } from 'ahooks';
import { Button } from 'antd';
import { ModalConfirm } from 'elegant-rc';

const delay = (t = 100) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export default () => {
  const submit = useMemoizedFn(async () => {
    await delay(3000);
  });

  return (
    <ModalConfirm
      disabledModal
      title="确定提示"
      onSubmit={submit}
      tipText="真的确定吗？，这是段提示"
    >
      <Button>确定</Button>
    </ModalConfirm>
  );
};
