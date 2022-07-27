/**
 * 提取数字中的数字
 * @param str 数字
 * @param mustNum 是否强转数字
 */
export function getNumber(str: number, mustNum?: boolean): number;

/**
 * 提取字符串中的数字
 * @param str 字符串
 * @param mustNum 要数字
 */
export function getNumber(str: string, mustNum: true): number;

/**
 * 提取字符串中的数字
 * @param str 字符串
 * @param mustNum 不要数字
 */
export function getNumber(str: string, mustNum?: false): string;

/**
 * 提取字符串或数字中的数字
 * @param str
 * @param mustNum 是否一定要数字
 * @returns
 */
export function getNumber(str: string | number, mustNum?: boolean) {
  /** 如果已经是数字那就直接返回它 */
  if (typeof str === 'number') {
    return str;
  }
  if (mustNum) {
    return +str.replace(/[^0-9]/gi, '') || 0;
  }
  return str.replace(/[^0-9]/gi, '');
}
