/*
 * @Author: zml
 * @Date: 2022-06-08 19:54:20
 * @LastEditTime: 2022-06-09 19:33:27
 */
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { RowClassName } from 'rc-table/lib/interface';
import { MyOmit } from 'tc-rc';

export type ProTableTypeReq<R extends ParamsType, P, V = 'text'> = Required<
  ProTableType<R, P, V>
>;

export type ParamsType = Record<string, any>;
export type Column<T extends ParamsType = ParamsType> = MyOmit<
  ProColumns<T>,
  'dataIndex'
> & {
  dataIndex?: keyof T | 'options';
  /** search表单中的栅格位置 */
  searchSpan?: number;
};
export type ProTableType<R extends ParamsType, P, V = 'text'> = MyOmit<
  ProTableProps<R, P, V>,
  'columns'
> & {
  columns?: Column<R>[];
  /** 竖向超过多大宽度滚动，只能用vh了 */
  yScroll?: ProTableTypeReq<R, P, V>['scroll']['y'];
  /** 在自己封装的rowClassName基础上在传过来的渲染className的函数 */
  rowClassNameExtra?: RowClassName<R>;
};