import { useMemoizedFn } from 'ahooks';
import { ModalButton } from 'elegant-rc';
import type { RenderModalContentType } from 'elegant-rc';
import { Button } from 'antd';

export default () => {
  const showModalContent = useMemoizedFn<RenderModalContentType>(
    ({ close }) => {
      return (
        <div>
          <div>指理由弹窗的内容</div>
          <Button onClick={close}>关闭弹窗</Button>
        </div>
      );
    },
  );

  return (
    <ModalButton title="demo弹窗" renderModalContent={showModalContent}>
      <Button type="primary">打开弹窗</Button>
    </ModalButton>
  );
};
