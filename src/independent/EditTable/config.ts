import { omit } from 'lodash';
import { nanoid } from 'nanoid';
import type { RecordWithId } from './type';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { IOptions } from 'elegant-rc';

export const uniqueKey = 'uniqueKey';

/**
 * 表示任何对象的类型
 */
declare type AnyObject = Record<string, unknown>;

/**
 * 获取默认的数据
 * @returns
 */
export const getDefaultRecordItem = (): RecordWithId => ({
  [uniqueKey]: nanoid(10),
});

/**
 * 给数据加上uniqueKey
 * @param data 数据
 * @returns
 */
export const addUniqueKey = <T extends AnyObject>(data: T[]) => {
  return data.map((ele) => {
    return { ...getDefaultRecordItem(), ...ele };
  });
};

/**
 * 可能有的时候不想要这个uniqueKey，那就可以使用这个方法去除
 * @param data 数据
 * @param deleteDisabled 不去除disabled
 */
export function deleteUniqueKey<T extends AnyObject>(
  data: T[],
  deleteDisabled?: false,
): Omit<T, typeof uniqueKey>[];

/**
 * 可能有的时候不想要这个uniqueKey和disabled，那就可以使用这个方法去除
 * @param data 数据
 * @param deleteDisabled 去除disabled
 */
export function deleteUniqueKey<T extends AnyObject>(
  data: T[],
  deleteDisabled: true,
): Omit<T, typeof uniqueKey | 'disabled'>[];

/**
 * 可能有的时候不想要这个uniqueKey，那就可以使用这个方法去除
 * @param data 数据
 * @param deleteDisabled 删除disabled
 * @returns 没有uniqueKey的数据
 */
export function deleteUniqueKey<T extends AnyObject>(
  data: T[],
  deleteDisabled?: boolean,
) {
  return data.map((ele) => {
    if (deleteDisabled) {
      return omit(ele, uniqueKey, 'disabled');
    }
    return omit(ele, uniqueKey);
  });
}

/**
 * 数据对象转换成options
 * @param valueEnum
 * @param valueMustToNumber value是否是强转number
 * @returns
 */
export const valueHandle = (
  valueEnum?:
    | AnyObject
    | Record<string, string | number | ReactNode>
    | IOptions[],
  valueMustToNumber?: boolean,
): IOptions<string>[] => {
  if (!valueEnum) {
    return [];
  }
  if (Array.isArray(valueEnum)) {
    if (!valueMustToNumber) {
      return valueEnum as IOptions<string>[];
    }
    return valueEnum.map((ele) => ({
      ...ele,
      value: Number(ele.value),
    })) as unknown as IOptions<string>[];
  }
  return Object.keys(valueEnum).map((key) => {
    const ele = valueEnum[key];
    let label = '';
    if (!ele) {
      label = '';
    }
    if (typeof ele === 'string') {
      label = ele;
    } else {
      /** @ts-ignore */
      label = isValidElement(ele) ? ele : ele?.text;
    }
    // const label = (typeof ele === 'object') ? ele?.text : ele.toString()
    return {
      value: valueMustToNumber ? (Number(key) as unknown as string) : key,
      label,
    };
  });
};
