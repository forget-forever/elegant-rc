import { useMemo } from 'react';
import { renderColumns, ProTable } from 'elegant-rc';

export default () => {
  const columns = useMemo(
    () =>
      renderColumns<Record<'name' | 'gender' | 'age', string>>(
        [
          { dataIndex: 'age', title: '年龄' },
          { dataIndex: 'name', title: '姓名' },
          { dataIndex: 'gender', title: '性别', hideInSearch: false },
        ],
        { hideInSearch: true },
      ),
    [],
  );
  return <ProTable columns={columns} />;
};
