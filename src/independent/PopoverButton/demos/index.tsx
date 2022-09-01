import { useMemoizedFn } from 'ahooks';
import { Button } from 'antd';
import type { RenderContentType } from 'tc-rc';
import { PopoverButton } from 'tc-rc';

export default () => {
  const renderContent = useMemoizedFn<RenderContentType>(({ close }) => {
    return (
      <div>
        <div>这里是popover弹出的内容</div>
        <Button onClick={close}>关闭</Button>
      </div>
    );
  });

  return (
    <PopoverButton renderContent={renderContent}>
      <Button type="primary">确定</Button>
    </PopoverButton>
  );
};
