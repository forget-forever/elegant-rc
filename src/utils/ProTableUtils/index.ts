import { Column, ParamsType } from './types';

/**
 * 二次封装一下Columns, 增加了dataIndex的限制, dataIndex为‘options’的时候会默认固定右边
 * @param list 与ProColumns配置一致，增加了searchSpan属性调搜索框的宽度
 * @returns 返回一个新的ProColumns
 */
export const renderColumns = <T extends ParamsType = ParamsType>(
  list: Column<T>[],
): Column<T>[] =>
  list.map((item) => ({
    hideInSearch: true,
    fixed: item.dataIndex === 'options' ? 'right' : undefined,
    width: '178px',
    ...item,
  }));
