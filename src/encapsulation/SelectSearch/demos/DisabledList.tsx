import { delay } from 'lodash';
import { SelectSearch } from 'elegant-rc';

const getList = (val: string) => {
  return new Promise<{ value: number; label: string }[]>((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 8 }).map((_i, i) => ({
          value: i,
          label: `${val}${i + 1}`,
        })),
      );
    }, 1000);
  });
};

export default () => {
  return (
    <SelectSearch
      style={{ width: 300 }}
      onRequest={getList}
      disabledList={[0, 3]}
    />
  );
};
