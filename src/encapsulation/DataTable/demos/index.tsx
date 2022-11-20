import { DataTable } from 'elegant-rc';
import { useState } from 'react';

const dataSource = {
  total: '1',
  current: '1',
  list: [
    {
      count_all_order: '总单量（含未支付取消单）',
    },
    {
      count_all_order: '12345',
    },
  ],
  searchId: '99999',
  cacheStartTime: '2022-07-17 07:12:56',
};

const Demo = () => {
  const [current, setCurrent] = useState(1);
  return (
    <DataTable
      current={current}
      loading={false}
      searchOnRefresh={() => {}}
      onSearchByPage={(current) => setCurrent(Number(current))}
      dataSource={dataSource}
    />
  );
};

export default Demo;
