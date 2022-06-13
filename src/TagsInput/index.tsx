/*
 * @Author: zml
 * @Date: 2022-06-13 21:18:06
 * @LastEditTime: 2022-06-13 21:57:12
 */
import { GetIProps, IOptions } from '../public';
import { useMemoizedFn } from 'ahooks';
import { Select } from 'antd';
import { useMemo, useState } from 'react';
import { FormContent } from '..';

const TagsInput: React.FC<
  {
    /** 输入的时候search的值，返回的值将被写入options */
    onSearch?: (
      val: string,
    ) => Promise<IOptions<string, string>[]> | IOptions<string, string>[];
    /** 用于分割的，可以传字符串，用&隔开，会用split转数组 */
    tokenSeparators?: string | string[];
    /** 使用什么模式多选，在tags模式下会options的第一个行是当前输入的值
     * @default multiple
     */
    mode?: 'multiple' | 'tags';
  } & GetIProps<typeof FormContent>
> = (props) => {
  const {
    onSearch,
    tokenSeparators = ',&+& &;&',
    mode = 'multiple',
    ...resetProps
  } = props;
  const [options, setOptions] = useState<IOptions<string, string>[]>();

  const searchHandle = useMemoizedFn(async (val: string) => {
    if (onSearch) {
      const res = onSearch?.(val);
      const data = res instanceof Promise ? await res : res;
      setOptions(data);
    }
  });

  const tokenSeparatorsConfig = useMemo(() => {
    return Array.isArray(tokenSeparators)
      ? tokenSeparators
      : tokenSeparators.split('&');
  }, [tokenSeparators]);

  return (
    <FormContent {...resetProps}>
      <Select
        tokenSeparators={tokenSeparatorsConfig}
        mode={mode}
        options={options}
        onSearch={searchHandle}
      />
    </FormContent>
  );
};

export default TagsInput;
