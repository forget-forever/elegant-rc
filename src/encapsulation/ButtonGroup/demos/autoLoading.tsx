import { ButtonGroup } from 'tc-rc';

const request = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const Demo = () => {
  return <ButtonGroup onSubmit={request} onCancel={request} />;
};
export default Demo;
