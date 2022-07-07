import React, { useEffect, useState } from 'react';
import { message, Select, Spin, SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import { IFilterChecked } from '../../../IndicatorSelect';
import { dealFilterIndexDataWithTimeOnly } from '../../dealFilterIndexDataWithTimeOnly';

const judgeOptions = [
  {
    value: '=',
    label: '等于',
  },
  {
    value: '!=',
    label: '不等于',
  },
];
type IProps = {
  optionsRecord: Record<string, SelectProps['options']>;
  setOptionsRecord: React.Dispatch<
    React.SetStateAction<Record<string, SelectProps['options']>>
  >;
  filterIndex: IFilterChecked[];
  setFilterIndex: (data: IFilterChecked[]) => void;
  where: IFilterChecked;
  index: number;
  getSearchList: (params: {
    where_name: string;
    keyword?: string;
  }) => Promise<any>;
};
const SelectInput: React.FC<IProps> = (props) => {
  const {
    optionsRecord,
    setOptionsRecord,
    where,
    filterIndex,
    index,
    setFilterIndex,
    getSearchList,
  } = props;

  const [fetching, setFetching] = useState(false);
  const getFilterList = async (params: {
    where_name: string;
    keyword?: string;
  }) => {
    try {
      setFetching(true);
      const res = await getSearchList(params);
      setOptionsRecord({ ...optionsRecord, [params.where_name]: res?.data });
    } catch (_error) {
      message.error('获取列表失败');
    }
    setFetching(false);
  };

  const judgeHandle = (val: string) => {
    const newFilterIndex = [...filterIndex];
    newFilterIndex[index] = { ...filterIndex[index], judge: val };
    setFilterIndex(dealFilterIndexDataWithTimeOnly(newFilterIndex));
  };
  const valueHandle = (val: string[]) => {
    const newFilterIndex = [...filterIndex];
    newFilterIndex[index] = { ...filterIndex[index], value: val };
    setFilterIndex(dealFilterIndexDataWithTimeOnly(newFilterIndex));
  };

  useEffect(() => {
    if (where.key && !optionsRecord[where.key]) {
      if (where.showSelect) {
        getFilterList({ where_name: where.key, keyword: '' });
      } else if (where.value.length) {
        getFilterList({ where_name: where.key, keyword: '' });
      }
    }
  }, [where.key]);

  return (
    <>
      <Select
        style={{ width: 120, marginRight: '20px' }}
        value={where.judge}
        disabled={!where.key.length}
        onChange={(val) => judgeHandle(val)}
        options={judgeOptions}
      />
      <Select
        mode="multiple"
        maxTagCount={4}
        style={{ minWidth: 200, marginRight: '20px', maxWidth: 300 }}
        value={where.value}
        disabled={!where.key.length}
        placeholder="请输入/选择"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={debounce(
          (value: string) =>
            getFilterList({ where_name: where.key, keyword: value }),
          800,
        )}
        onChange={(val) => valueHandle(val)}
        options={optionsRecord[where.key]}
      />
    </>
  );
};
export default SelectInput;
