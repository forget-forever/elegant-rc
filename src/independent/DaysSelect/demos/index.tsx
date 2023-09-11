import { Form } from 'antd';
import { ButtonAsync, DaysSelect } from 'tc-rc';

export default () => {
  return (
    <Form
      onFinish={(val) => {
        alert(JSON.stringify(val));
      }}
    >
      <Form.Item label="日期选择" name="date">
        <DaysSelect />
      </Form.Item>
      <ButtonAsync type="primary" htmlType="submit">
        提交
      </ButtonAsync>
    </Form>
  );
};
