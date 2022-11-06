import { useMemoizedFn } from 'ahooks';
import { NumControl } from 'elegant-rc';

export default () => {
  const add = useMemoizedFn(() => {
    alert('add');
  });

  const remove = useMemoizedFn((num: number | number[]) => {
    alert('remove:' + num);
  });

  return <NumControl index={0} add={add} remove={remove} />;
};
