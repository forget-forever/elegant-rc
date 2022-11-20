import { ButtonAsync } from 'elegant-rc';

const request = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
const Demo = () => {
  return (
    <ButtonAsync onClick={request} type="primary">
      点击
    </ButtonAsync>
  );
};

export default Demo;
