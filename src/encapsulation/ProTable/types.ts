/*
 * @Author: zml
 * @Date: 2022-06-08 19:54:20
 * @LastEditTime: 2022-06-09 19:33:27
 */
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { RowClassName } from 'rc-table/lib/interface';
import type { MyOmit } from 'elegant-rc';

export type ProTableTypeReq<R extends ParamsType, P, V = 'text'> = Required<
  ProTableType<R, P, V>
>;

export type ParamsType = Record<string, any>;
export type Column<T extends ParamsType = ParamsType> = MyOmit<
  ProColumns<T>,
  'dataIndex'
> & {
  dataIndex?: keyof T | 'options';
  /** search表单中的栅格大小，如果调用的是本组件库中的ProTable，那这一项就会生效 */
  searchSpan?: number;
  /**
   * 如果传入了这个属性，会自动加上renderText属性，通过moment，format一些时间
   * @attention 如果传过来的是数组，第一个参数进入moment的配置参数，第二个是format参数
   */
  format?: string | [string, string];
};
export type ProTableType<R extends ParamsType, P, V = 'text'> = MyOmit<
  ProTableProps<R, P>,
  'columns'
> & {
  columns?: Column<R>[];
  /** 竖向超过多大宽度滚动，只能用vh了 */
  yScroll?: ProTableTypeReq<R, P, V>['scroll']['y'];
  /** 在自己封装的rowClassName基础上在传过来的渲染className的函数 */
  rowClassNameExtra?: RowClassName<R>;
};
