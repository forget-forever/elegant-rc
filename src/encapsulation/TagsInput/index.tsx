/*
 * @Author: zml
 * @Date: 2022-06-13 21:18:06
 * @LastEditTime: 2022-07-22 10:54:15
 */
import { useMemoizedFn } from 'ahooks';
import { Select } from 'antd';
import { useMemo, useState } from 'react';
import { GetIProps, IOptions, MyOmit } from 'tc-rc';
import { FormContent } from '..';

/**
 * 标签输入组件，可以直接传name放入Form表单中使用，也可以传value和onChange自己控制
 * @param props
 * @returns
 */
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
    /** value的值 */
    value?: string[];
    /** 数值变化的时候触发的函数 */
    onChange?: (val: string[]) => void;
    /** 需要透传给select标签的值，value, onChnage需要使用TagsInput本身的属性, defauleValue不可透传 */
    selectProps?: MyOmit<
      GetIProps<typeof Select>,
      'value' | 'onChange' | 'defaultValue'
    >;
  } & MyOmit<GetIProps<typeof FormContent>, 'onChange'>
> = (props) => {
  const {
    onSearch,
    tokenSeparators = ',&+& &;&',
    mode = 'multiple',
    placeholder,
    name,
    value,
    onChange,
    selectProps,
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

  const valueConf = useMemo(() => {
    if (name) {
      return undefined;
    }
    return value;
  }, [name]);

  return (
    <FormContent name={name} {...resetProps}>
      <Select
        tokenSeparators={tokenSeparatorsConfig}
        mode={mode}
        value={valueConf}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        onSearch={searchHandle}
        {...selectProps}
      />
    </FormContent>
  );
};

export default TagsInput;
