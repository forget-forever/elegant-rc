import { ButtonAsync } from 'elegant-rc';

const request = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
};
const Demo = () => {
  console.log('aaa');
  return (
    <ButtonAsync onClick={request} type="primary" loadingDelay={1000}>
      点击
    </ButtonAsync>
  );
};

export default Demo;
