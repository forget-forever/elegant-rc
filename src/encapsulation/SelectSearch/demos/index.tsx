import { delay } from 'lodash';
import { SelectSearch } from 'elegant-rc';

const getList = (val: string) => {
  return new Promise<{ value: number; label: string }[]>((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { value: 1, label: '选项一' },
          { value: 2, label: '选项二' },
          { value: 3, label: '选项三' },
          { value: 4, label: '选项四' },
        ].filter(({ label }) => label.includes(val)),
      );
    }, 1000);
  });
};

export default () => {
  return <SelectSearch style={{ width: 300 }} onRequest={getList} />;
};
