import { useMemoizedFn } from 'ahooks';
import { get, omit } from 'lodash';
import { useMemo } from 'react';
import type { MyOmit } from 'elegant-rc';
import { nanoid } from 'nanoid';
import type { EditTableProps } from './index';
import type { RecordItem } from './type';
import EditTable from './';
import { uniqueKey } from './config';

const keySym = Symbol('uniqueKey');

const EditTableSym = <DataItem extends RecordItem>(
  props: MyOmit<EditTableProps<DataItem>, 'value'> & {
    value?: (DataItem & Partial<Record<typeof keySym, string>>)[];
  },
) => {
  const { value, onChange, ...resetProps } = props;

  const valueRes = useMemo(() => {
    /** 没有key的给它加上key */
    value?.forEach((ele) => {
      if (ele && typeof ele === 'object' && !ele[keySym]) {
        ele[keySym] = nanoid(8);
      }
    });

    return value?.map((ele) => {
      return {
        ...ele,
        [uniqueKey]: ele?.[keySym],
      };
    });
  }, [value]);

  const changeHandle = useMemoizedFn((val?: DataItem[]) => {
    onChange?.(
      val?.map((ele) => {
        const res = {
          ...omit(ele, uniqueKey),
          [keySym]: get(ele, uniqueKey) || nanoid(),
        };
        return res;
      }) as typeof value,
    );
  });

  return <EditTable value={valueRes} onChange={changeHandle} {...resetProps} />;
};

export default EditTableSym;
