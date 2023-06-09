import React, { useMemo, useState } from 'react';
import { Select, SelectProps, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { whereIcon } from '../ParamData/components/IndicatorFilter/styles';
import {
  IDimDetail,
  IDims,
  IFilterChecked,
  IMapDimGroupCnameToIndicators,
  IMapDimNameToDetail,
} from '../IndicatorSelect';
import {
  anyTimeOnlyOnTime,
  dealFilterIndexDataWithTimeOnly,
} from './dealFilterIndexDataWithTimeOnly';
import { getInitFilter } from './getInitFilter';
import SelectInput from './components/SelectInput';
import FilterDateRange from './components/FilterDateRange';
import { EDimType } from '../IndicatorSelect/enum';

const { Option, OptGroup } = Select;

interface IFilterIndex {
  blockWidth?: number;
  disabled?: boolean;
  filterIndex: IFilterChecked[];
  setFilterIndex: (value: Array<IFilterChecked>) => void;
  disableHandel: (ele: IDims) => boolean;
  mapDimNameToDetail: IMapDimNameToDetail;
  mapDimGroupCnameToIndicators: IMapDimGroupCnameToIndicators;
  getSearchList: (params: {
    where_name: string;
    keyword?: string;
  }) => Promise<any>;
}

const DimFilter: React.FC<IFilterIndex> = (props) => {
  const {
    blockWidth,
    disabled = false,
    filterIndex,
    setFilterIndex,
    disableHandel,
    mapDimNameToDetail,
    mapDimGroupCnameToIndicators,
    getSearchList,
  } = props;

  const [optionsRecord, setOptionsRecord] = useState<
    Record<string, SelectProps['options']>
  >({});

  const onKeyChange = (
    option: { value: string; label: string },
    index: number,
  ) => {
    const newFilterIndex = [...filterIndex];
    const key = option.value;
    const showSelect = !!mapDimNameToDetail?.get(key)?.show_select;
    const type = mapDimNameToDetail?.get(key)?.type || EDimType.INPUT;
    newFilterIndex[index] = {
      ...newFilterIndex[index],
      key,
      value: [],
      showSelect,
      type,
    };
    setFilterIndex(
      dealFilterIndexDataWithTimeOnly(newFilterIndex, option.value, type),
    );
  };

  // 指标筛选 - 添加
  const handleAdd = () => {
    const newFilterIndex = [...filterIndex, { ...getInitFilter() }];
    setFilterIndex(dealFilterIndexDataWithTimeOnly(newFilterIndex));
  };

  // 指标筛选 - 删除
  const handleDel = (index: number) => {
    let temp = [...filterIndex];
    // 如果 temp 只有一条
    if (temp.length === 1) {
      temp = [{ ...getInitFilter() }];
    } else {
      temp.splice(index, 1);
    }
    setFilterIndex(dealFilterIndexDataWithTimeOnly(temp));
  };

  const filterIndexKeyList = filterIndex.map(({ key }) => key);

  const disabledGetter = (ele: IDims) => {
    return (
      filterIndexKeyList.includes(ele.name) ||
      disableHandel(ele) ||
      anyTimeOnlyOnTime(filterIndex, ele)
    );
  };

  const options = useMemo(() => {
    const tmp =
      mapDimGroupCnameToIndicators instanceof Map
        ? mapDimGroupCnameToIndicators.entries()
        : [];
    const source = [...tmp];
    const newSource = source.map(([label, option]) => {
      return {
        label,
        option: option.filter((op: IDimDetail) => op.is_where),
      };
    });
    return newSource.map((item) => (
      <OptGroup label={item.label} key={item.label}>
        {item.option.map((ele: IDimDetail) => (
          <Option
            value={ele.name}
            key={ele.name}
            extra={ele}
            disabled={disabledGetter(ele)}
          >
            {ele.show_name}
          </Option>
        ))}
      </OptGroup>
    ));
  }, [mapDimGroupCnameToIndicators, disabledGetter]);

  return (
    <Space direction="vertical">
      {filterIndex.map((where, index) => (
        <Space key={`${index}${where.key}${where.judge}${where.type}`}>
          <Select
            style={{ minWidth: blockWidth }}
            disabled={disabled}
            showSearch
            optionFilterProp="children"
            placeholder="请选择筛选条件"
            value={where.key || undefined}
            onChange={(_, option) => onKeyChange(option as any, index)}
          >
            {options}
          </Select>
          {['time', 'time_only'].includes(
            where.type || mapDimNameToDetail.get(where.key)?.type,
          ) ? (
            <FilterDateRange
              disabled={disabled}
              filterIndex={filterIndex}
              setFilterIndex={setFilterIndex}
              index={index}
              where={where}
            />
          ) : (
            <SelectInput
              disabled={disabled}
              where={where}
              optionsRecord={optionsRecord}
              setOptionsRecord={setOptionsRecord}
              filterIndex={filterIndex}
              index={index}
              setFilterIndex={setFilterIndex}
              getSearchList={getSearchList}
            />
          )}
          {index === 0 && !disabled && (
            <PlusCircleOutlined
              style={{
                color: '#40a9ff',
                ...whereIcon,
              }}
              disabled={disabled}
              onClick={handleAdd}
            />
          )}
          {!disabled && (
            <MinusCircleOutlined
              style={{
                color: '#40a9ff',
                opacity: filterIndex.length === 1 ? 0.4 : 1,
                ...whereIcon,
              }}
              disabled={disabled}
              onClick={() => handleDel(index)}
            />
          )}
        </Space>
      ))}
    </Space>
  );
};

export default DimFilter;
