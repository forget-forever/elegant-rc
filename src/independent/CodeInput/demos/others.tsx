/*
 * @Author: zml
 * @Date: 2022-06-20 20:32:20
 * @LastEditTime: 2022-06-20 20:37:45
 */
import { Form } from 'antd';
import CodeInput from '..';

export default () => {
  return (
    <Form>
      <Form.Item name="readonly" label="只读模式" initialValue="var a = 1;">
        <CodeInput readonly />
      </Form.Item>
      <Form.Item
        name="aLang"
        label="不可切换语言"
        initialValue="SELECT * FROM test_table;"
      >
        <CodeInput readonly defaultLanguage="sql" />
      </Form.Item>
    </Form>
  );
};
