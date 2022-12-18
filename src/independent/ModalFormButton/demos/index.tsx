import { useMemoizedFn } from 'ahooks';
import { Button, Input } from 'antd';
import { FormContent, ModalFormButton } from 'elegant-rc';

const delay = (t = 100) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export default () => {
  const submit = useMemoizedFn(async (val: { val: string }) => {
    console.log(val);
    await delay(3000);
  });

  return (
    <ModalFormButton title="确定提示" onSubmit={submit}>
      <div>输出值看控制台</div>
      <FormContent name="val1" label="值一" span={24}>
        <Input.TextArea />
      </FormContent>
      <FormContent name="val1" label="值二" span={24}>
        <Input.TextArea />
      </FormContent>
    </ModalFormButton>
  );
};
