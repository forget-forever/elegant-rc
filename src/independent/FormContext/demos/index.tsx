import { Form, Input, Switch } from 'antd';
import { useState } from 'react';
import { FormContextProvider, useContextForm } from 'elegant-rc';

const ItemControl: React.FC<{
  value?: string;
  onChange?: (val: unknown) => void;
}> = (props) => {
  const { disabled } = useContextForm();

  return <Input {...props} disabled={disabled} placeholder="请输入" />;
};

const Item = () => {
  return (
    <Form.Item name="val" label="文本输入">
      <ItemControl />
    </Form.Item>
  );
};

export default () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FormContextProvider disabled={disabled}>
      <span>是否屏蔽</span>
      <Switch checked={disabled} onChange={setDisabled} />
      <br />
      <Form>
        <Item />
      </Form>
    </FormContextProvider>
  );
};
