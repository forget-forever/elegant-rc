import { Button, Form, Input, InputNumber } from 'antd';
import { FormItemCnf, FormItemCnfProvider, SelectControl } from 'elegant-rc';

export default () => {
  return (
    <Form
      onFinish={(val) => {
        console.log(val);
        alert(JSON.stringify(val));
      }}
    >
      <Form.Item name="name" label="姓名">
        <Input />
      </Form.Item>
      <FormItemCnfProvider preNamePath="msg">
        <FormItemCnf name="age" label="年龄">
          <InputNumber />
        </FormItemCnf>
        <FormItemCnf name="gender" label="性别">
          <SelectControl
            valueEnum={{ male: '男', female: '女', secret: '保密' }}
          />
        </FormItemCnf>
      </FormItemCnfProvider>
      <Button htmlType="submit">确定</Button>
    </Form>
  );
};
