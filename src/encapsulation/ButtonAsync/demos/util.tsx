import { ButtonAsync } from 'tc-rc';

const request = () => {};
const Demo = () => {
  return (
    <>
      <ButtonAsync onClick={request} type="primary">
        点击
      </ButtonAsync>
    </>
  );
};

export default Demo;
