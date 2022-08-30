/*
 * @Author: zml
 * @Date: 2022-06-08 19:54:20
 * @LastEditTime: 2022-06-23 13:06:48
 */
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { MyOmit } from 'tc-rc';

export type ParamsType = Record<string, any>;
export type Column<T extends ParamsType = ParamsType> = MyOmit<
  ProColumns<T>,
  'dataIndex'
> & {
  dataIndex?: keyof T | 'options';
  /** search表单中的栅格位置，如果调用的是本组件库中的ProTable组件那么这个配置会生效 */
  searchSpan?: number;
};
