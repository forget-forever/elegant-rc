import type { IOptions } from 'elegant-rc';

/**
 * Select组件的filterOption筛选方法
 * @param inputVal 输入的值
 * @param option 当前的option
 * @returns 是否匹配上
 */
export const filterOption = (
  inputVal?: string,
  option?: IOptions<unknown, string>,
) => {
  if (!inputVal) {
    return true;
  }
  const { label = '' } = option || {};
  if (typeof label === 'string') {
    return label.includes(inputVal) ?? false;
  }
  return true;
};
