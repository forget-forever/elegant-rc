import { ButtonAsync } from 'elegant-rc';

const request = () => {};
const Demo = () => {
  return (
    <ButtonAsync onClick={request} type="primary">
      点击
    </ButtonAsync>
  );
};

export default Demo;
