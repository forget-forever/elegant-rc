import { useMemo } from 'react';
import { ProTable, renderColumns } from 'elegant-rc';

export default () => {
  const columns = useMemo(
    () =>
      renderColumns<Record<'name' | 'gender' | 'age', string>>([
        { dataIndex: 'age', title: '年龄', searchSpan: 2 },
        { dataIndex: 'name', title: '姓名' },
        { dataIndex: 'gender', title: '性别', hideInSearch: false },
      ]),
    [],
  );
  return <ProTable columns={columns} />;
};
