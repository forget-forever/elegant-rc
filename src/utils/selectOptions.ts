import { IOptions } from 'tc-rc';

/**
 * Select组件的filterOption筛选方法
 * @param inputVal 输入的值
 * @param option 当前的option
 * @returns 是否匹配上
 */
export const filterOption = (
  inputVal: string,
  option?: IOptions<unknown, string>,
) => {
  return option?.label.includes(inputVal) ?? false;
};
