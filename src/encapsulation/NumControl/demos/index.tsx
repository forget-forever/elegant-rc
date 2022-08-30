import { useMemoizedFn } from 'ahooks';
import { NumControl } from 'tc-rc';

export default () => {
  const add = useMemoizedFn(() => {
    alert('add');
  });

  const remove = useMemoizedFn((num: number | number[]) => {
    alert('remove:' + num);
  });

  return <NumControl index={0} add={add} remove={remove} />;
};
