import type { ProColumns } from '@ant-design/pro-table';
import Table from '@ant-design/pro-table';
import { useMemoizedFn } from 'ahooks';
import { uniqueId } from 'lodash';
import type { Moment } from 'moment';
import { useMemo } from 'react';
import type { OmitVoid } from 'tc-rc';
import { useSearchSpanEffect } from './hooks';
import './styles.less';
import type { ParamsType, ProTableType, ProTableTypeReq } from './types';

const defaultHeader = <div style={{ height: 16, display: 'none' }} />;

/**
 * 给ProTable做的二次封装
 * @param props 和ProTableProps一样，自带了rowKey属性，默认是id，可以配合renderColumns一起使用，体验效果更好
 * @returns
 */
const ProTable = <R extends ParamsType, P extends ParamsType>(
  props: ProTableType<R, P>,
) => {
  const {
    pagination,
    request,
    columns,
    yScroll,
    scroll,
    rowClassNameExtra,
    ...resetProps
  } = props;
  /** 每个组件生成组件id */
  const fcid = useMemo(() => `pro-table-${uniqueId()}`, []);

  useSearchSpanEffect(fcid, columns);

  const rowClassName = useMemoizedFn<OmitVoid<typeof rowClassNameExtra>>(
    (...args) => {
      let res = `${rowClassNameExtra?.(...args)} ` || '';
      if (args[1] % 2) {
        res += 'bg-gray';
      }
      return res;
    },
  );

  const requestFn = useMemoizedFn<ProTableTypeReq<R, P>['request']>(
    (params, ...resetArgs) => {
      const { current = 1, pageSize = 30 } = params;
      return request!?.({ ...params, pageSize, current }, ...resetArgs);
    },
  );

  const pageConfig = useMemo(
    () =>
      pagination === false
        ? false
        : {
            pageSize: 30,
            ...pagination,
          },
    [pagination],
  );

  const scrollConfig = useMemo(
    () => ({
      y: yScroll,
      x: 600,
      ...scroll,
    }),
    [scroll, yScroll],
  );

  return (
    <Table
      className={`pro-table-self ${fcid}`}
      rowKey="id"
      rowClassName={rowClassName}
      pagination={pageConfig}
      request={request && requestFn}
      columns={columns as ProColumns[]}
      headerTitle={defaultHeader}
      options={false}
      scroll={scrollConfig}
      // dateFormatter={dateFormatter}
      {...resetProps}
    />
  );
};

export default ProTable;
