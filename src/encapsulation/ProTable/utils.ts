import moment from 'moment';
import type { Column, ParamsType } from './types';

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
    fixed: item.dataIndex === 'options' ? 'right' : undefined,
    /** format语法糖的实现 */
    renderText: item.format
      ? (text) => {
          const { format } = item;
          if (!format) {
            return text;
          }
          let sourceFormat: string | undefined;
          let targetFormat = format.toString();

          if (Array.isArray(format)) {
            sourceFormat = format[0];
            targetFormat = format[1];
          }

          const targetMoment = moment(text, sourceFormat);
          if (targetMoment.isValid()) {
            return targetMoment.format(targetFormat);
          }
          return text;
        }
      : undefined,

    ...wrapConfig,
    ...item,
  }));
