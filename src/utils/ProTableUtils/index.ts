import { Column, ParamsType } from './types';

/**
 * 二次封装一下Columns, 增加了dataIndex的限制, dataIndex为‘options’的时候会默认固定右边
 * @param list 与ProColumns配置一致，增加了searchSpan属性调搜索框的宽度
 * @param wrapConfig 统一的配置方法，它可以给每一项都会加的配置，但是最终还是以list中的每一项为准
 * @returns 返回一个新的ProColumns
 */
export const renderColumns = <T extends ParamsType = ParamsType>(
  list: Column<T>[],
  wrapConfig?: Partial<Column<T>>,
): Column<T>[] =>
  list.map((item) => ({
    hideInSearch: true,
    fixed: item.dataIndex === 'options' ? 'right' : undefined,
    ...wrapConfig,
    ...item,
  }));

export default renderColumns;
