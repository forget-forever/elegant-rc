import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import { ButtonAsync } from 'elegant-rc';

const Demo = () => {
  const [loading, setLoading] = useState(false);

  const request = useMemoizedFn(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <ButtonAsync loading={loading} onClick={request} type="primary">
      点击
    </ButtonAsync>
  );
};

export default Demo;
