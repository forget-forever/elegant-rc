import { mapValues } from 'lodash';
import type React from 'react';

type EnumType<V extends number | string, T extends React.ReactNode> = {
  /** 运行过程中会用到的真实value，常常是一些让人不好理解的数字或者其他的值 */
  value: V;
  /** 在视图层需要展示的文字或者节点 */
  text: T;
};

/**
 * 生成枚举的函数
 * @param enumData 枚举数据，键名就是代码的逻辑中使用的（就好比是前端自己声明的彼岸量），会映射到相对应的value
 */
const generateEnum = <
  K extends string,
  V extends number | string,
  T extends React.ReactNode,
>(
  enumData: Record<K, EnumType<V, T>>,
) => {
  const keys = Object.keys(enumData);
  return {
    /** label，value的options的形式 */
    options: keys.map((k) => ({
      value: enumData[k].value,
      label: enumData[k].text,
    })),
    /** valueEnum，对应的value: text 的键值对，可以做到一个值到text的映射 */
    valueEnum: keys.reduce((pre, cur) => {
      return Object.assign(pre, { [enumData[cur].value]: enumData[cur].text });
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    }, {} as Record<V, T>),
    /** 枚举 */
    enum: mapValues(enumData, (v) => v.value),
  };
};
