import { Form, Input, Row, Select } from 'antd';
import { FormContent } from 'tc-rc';

const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'femal', label: '女' },
  { value: 'secret', label: '保密' },
];

export default () => {
  return (
    <Form>
      <Row gutter={24}>
        <FormContent name="name" span={8} label="姓名">
          <Input />
        </FormContent>
        <FormContent name="age" span={8} label="年龄">
          <Input />
        </FormContent>
        <FormContent name="gender" span={8} label="性别">
          <Select options={genderOptions} />
        </FormContent>
        <FormContent name="describe" label="描述" span={18}>
          <Input.TextArea />
        </FormContent>
      </Row>
    </Form>
  );
};
