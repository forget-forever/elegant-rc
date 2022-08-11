/*
 * @Author: zml
 * @Date: 2022-07-01 19:02:31
 * @LastEditTime: 2022-07-26 19:09:08
 */
import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { AutoComplete as Complete, Form } from 'antd';
import type { GetIProps, IOptions, MyOmit } from 'tc-rc';

type OptionType = IOptions<string | number, React.ReactNode>;
const AutoCompete: React.FC<
  MyOmit<GetIProps<typeof Complete>, 'onSearch'> & {
    /** 可以返回一个数组用于渲染options，如果这个返回了数组就会替换掉props中传过来的oprions */
    onSearch?: (
      val: string,
      options?: OptionType[],
    ) => Promise<OptionType[]> | OptionType[] | void;
  }
> = (props) => {
  const { onSearch } = props;
  const [options, setOptions] = useSafeState<OptionType[]>();

  const searchHandle = useMemoizedFn(async (val: string) => {
    if (onSearch) {
      const res = await onSearch?.(val, options);
      setOptions(res ?? undefined);
    }
  });

  return (
    <Form>
      <Form.Item name="value">
        <Complete
          {...props}
          options={options ?? props.options}
          onSearch={searchHandle}
        />
      </Form.Item>
    </Form>
  );
};

export default AutoCompete;
