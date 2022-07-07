import React from 'react';
import { Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  IMapDimGroupCnameToIndicators,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../../IndicatorSelect';
import { useGroupOptions } from './useGroupOptions';

type IProps = {
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapDimGroupCnameToIndicators: IMapDimGroupCnameToIndicators;
};
const GroupTangram: React.FC<IProps> = (props) => {
  const { params, setPartialParams, mapDimGroupCnameToIndicators } = props;

  const {
    json: { groupby, select },
  } = params;

  const { setValue, filterOption, onSearch, options } = useGroupOptions({
    select,
    mapDimGroupCnameToIndicators,
  });

  const mode = 'multiple';

  // 指标选择 - 分组条件
  const onGroupChange = (value: string[]) => {
    setValue('');
    setPartialParams({
      json: {
        groupby: Array.isArray(value) ? value : [value],
      },
    });
  };

  return (
    <div>
      <Select
        mode={mode}
        optionFilterProp="children"
        style={{ minWidth: 300, maxWidth: 455 }}
        value={groupby}
        onChange={onGroupChange}
        placeholder="按选中条件分组"
        maxTagCount={4}
        maxTagTextLength={3}
        filterOption={filterOption}
        onSearch={onSearch}
      >
        {options}
      </Select>
      <div>
        {groupby.length > 4 ? (
          <>
            <ExclamationCircleOutlined style={{ color: '#ff9966' }} />
            <span style={{ marginLeft: 8, color: '#ff9966' }}>
              分组条件过多会降低查询速度，使结果文件增大
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GroupTangram;
