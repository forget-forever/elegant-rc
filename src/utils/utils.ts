import { forOwn } from 'lodash';

/**
 * 验证一个对象中是否有一项为空的
 * @param item 一项的数据
 * @param checkArr 需要check的字段
 * @returns
 */
export const rowItemValid = <I extends Record<string, unknown>>(
  item: I,
  checkArr?: (keyof I)[],
) => {
  let res = true;
  forOwn(item, (v, k) => {
    if (checkArr && !checkArr.includes(k)) {
      return;
    }
    if (v == undefined) {
      res = false;
    }
    if (typeof v === 'string' && v === '') {
      res = false;
    }
    if (Array.isArray(v) && !v.length) {
      res = false;
    }
  });
  return res;
};

/**
 * 对象遍历的方法
 * @param obj 对象
 * @param cb 遍历回调函数: cb: ( key: 对象的键名  item: 对象的键值  obj: 当前处理中的对象 ) => Partial<OBJ>
 * @returns 处理之后的对象
 */
export const objMap = <
  K extends string | number,
  P extends unknown,
  R extends unknown,
>(
  obj = {} as Record<K, P>,
  cb: (
    /** 对象的键名 */
    key: K,
    /** 对象的键值 */
    item: P,
    /** 当前处理中的对象 */
    obj: Partial<Record<K, R>>,
  ) => Partial<Record<K, R>>,
) => {
  return Object.entries(obj).reduce(
    (pre, [k, v]) => ({ ...pre, ...cb(k as K, v as P, pre) }),
    {} as Record<K, R>,
  );
};

const uniqueIdMap: Record<string, number> = {};

/**
 * 获取独一无二的id, 数字自增从0开始
 * @param preStr 前缀，前缀改了后会从1重新开始
 * @returns
 */
export const generateUniqueId = (preStr: string = '') => {
  /** 如果没有那就写入一个0 */
  if (!uniqueIdMap[preStr]) {
    uniqueIdMap[preStr] = 0;
  }

  uniqueIdMap[preStr] += 1;
  return `${preStr}${uniqueIdMap[preStr] || 0}`;
};

/**
 * 刷新独一无二的id
 * @param preStr 需要刷新的前缀
 * @param refreshValue 复位到的值，默认是复位到最开始的时候, 复位之后下一个生成的就是它的数字+1
 */
export const refreshUniqueId = (preStr: string = '', refreshValue = 0) => {
  if (uniqueIdMap[preStr] || refreshValue > 0) {
    uniqueIdMap[preStr] = refreshValue;
  }
};
