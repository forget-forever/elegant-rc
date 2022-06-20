import { useMemoizedFn } from 'ahooks';
import { Form, Input, Row, Select } from 'antd';
import { FormContent, ButtonGroup } from 'tc-rc';

const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'femal', label: '女' },
  { value: 'secret', label: '保密' },
];

type FormData = Record<'name' | 'age' | 'describe' | 'gender', string>;
export default () => {
  const onFinish = useMemoizedFn((val: FormData) => {
    alert(JSON.stringify(val, null, 4));
  });

  return (
    <Form onFinish={onFinish}>
      <Row gutter={24}>
        <FormContent required name="name" span={8} label="姓名">
          <Input />
        </FormContent>
        <FormContent name="age" span={8} label="年龄">
          <Input />
        </FormContent>
        <FormContent required name="gender" span={8} label="性别">
          <Select options={genderOptions} />
        </FormContent>
        <FormContent name="describe" label="描述" span={18}>
          <Input.TextArea />
        </FormContent>
        <ButtonGroup submitProps={{ htmlType: 'submit' }} />
      </Row>
    </Form>
  );
};
