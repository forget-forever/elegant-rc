import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import { useMemoizedFn } from 'ahooks';
import { useProFormSubmitter } from 'tc-rc';

const genderValueEnum = {
  0: '男',
  1: '女',
};

export default () => {
  const onCancel = useMemoizedFn(() => {
    alert('cancel');
  });

  const onFinish = useMemoizedFn(async () => {
    alert('submit');
  });

  const submitter = useProFormSubmitter({
    submitText: '确定',
    cancelText: '重置',
    onCancel,
  });

  return (
    <ProForm layout="horizontal" onFinish={onFinish} submitter={submitter}>
      <ProFormSelect label="男" valueEnum={genderValueEnum} />
    </ProForm>
  );
};
