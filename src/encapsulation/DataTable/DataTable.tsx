import React from 'react';
import { Card, Table } from 'antd';
import { PaginationProps } from 'antd/es/pagination';
import CacheTip from '../CacheTip';
import useTableListEvents from './useTableListEvents';
import './index.css';

type IProps = {
  current: number;
  loading: boolean;
  dataSource: {
    list: any[];
    total: string;
    cacheStartTime: string | null;
    searchId?: string;
  };
  onSearchByPage: (current: string) => void;
  searchOnRefresh: (searchId?: string) => void;
};
const DataTable: React.FC<IProps> = (props) => {
  const { current, loading, dataSource, onSearchByPage, searchOnRefresh } =
    props;

  const handlePagination = (pagination: PaginationProps) => {
    onSearchByPage(String(pagination.current ?? 1));
  };

  const { divRef, columns, source, total } = useTableListEvents({
    dataSource,
  });

  return (
    <Card
      bodyStyle={{
        maxWidth: '100%',
        marginBottom: '1px',
        marginTop: 10,
        ...(dataSource.cacheStartTime ? { paddingTop: 0 } : {}),
      }}
      bordered={false}
    >
      <div className="dataTableContainer" ref={divRef}>
        <CacheTip dataSource={dataSource} searchOnRefresh={searchOnRefresh} />
        <Table
          rowKey="key"
          size="small"
          scroll={{ x: 'max-content' }}
          rowClassName={(record, index) => (index % 2 ? 'deepRow' : 'lightRow')}
          bordered
          columns={columns}
          dataSource={source}
          pagination={{
            current: Number(current) || 1,
            total,
            pageSize: 50,
            hideOnSinglePage: true,
            showSizeChanger: false,
            showTotal: (all, range) =>
              `第 ${range[0]}-${range[1]} 条/总共 ${all} 条`,
          }}
          loading={loading}
          onChange={(pagination) => handlePagination(pagination)}
        />
      </div>
    </Card>
  );
};
export default DataTable;
