/*
 * @Author: zml
 * @Date: 2022-06-17 10:18:05
 * @LastEditTime: 2022-07-13 13:59:15
 */
import { CaretDownOutlined } from '@ant-design/icons';
import type { ValueType, VBase } from './type';

/**
 * 选择框后面的图标
 */
export const suffixIcon = <CaretDownOutlined style={{ marginTop: 3 }} />;

/**
 * 可以选择的语言，如果加了语言，记得注意codemirroe中有没有mode和hint
 * value最好加一些as const更有利于ts的类型推导
 */
export const languageOptions = [
  { value: 'javascript' as const, label: 'JavaScript' },
  { value: 'sql' as const, label: 'Sql' },
  { value: 'python' as const, label: 'Python' },
  { value: 'shell' as const, label: 'Shell' },
  // { value: 'php' as const, label: 'PHP' }
];
export const langes = languageOptions.map(({ value }) => value);

/**
 * 获取数据，可以对哪一种类型的数据获取做一个收敛
 * @param type 格式类型
 * @param val 数据值
 * @returns
 */
export const getValue = (type: VBase, val?: ValueType<VBase>) => {
  if (!val) {
    return '';
  }
  if (type === 'obj') {
    return (val as ValueType<'obj'>)?.str || '';
  }
  return val?.toString() || '';
};

/**
 * 生成所需要的数据格式
 * @param type 格式类型
 * @param lang 当前选择的语言
 * @param val 数据值
 * @returns
 */
export const generateVal = <V extends VBase>(
  type: V,
  lang: string,
  val?: string,
): ValueType<V> => {
  if (type === 'obj') {
    return {
      str: val,
      lang,
    } as ValueType<V>;
  }
  return val as ValueType<V>;
};
