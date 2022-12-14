import React, { useMemo } from 'react';
import { Select } from 'antd';
import {
  IMapIndicatorNameToDetail,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../../IndicatorSelect';

const orderOptions = [
  {
    label: '降序',
    value: 'desc',
  },
  {
    label: '升序',
    value: 'asc',
  },
];

type IOrderMeasures = { key: string; orderType: 'desc' | 'asc' };

type IProps = {
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
};

const IndicatorOrder: React.FC<IProps> = (props) => {
  const { params, setPartialParams, mapIndicatorNameToDetail } = props;
  const {
    json: { select, orderMeasures },
  } = params;

  const { orderType, key } = orderMeasures[0];

  const options = useMemo(() => {
    return select.map((item) => ({
      label: mapIndicatorNameToDetail.get(item)?.show_name,
      value: item,
    }));
  }, [JSON.stringify(select), mapIndicatorNameToDetail]);

  const onChangeOrder = (orderValue: string, prop: keyof IOrderMeasures) => {
    const newOrderMeasures = [{ ...orderMeasures[0] }] as [IOrderMeasures];
    newOrderMeasures[0][prop] = orderValue as any;
    setPartialParams({
      json: {
        orderMeasures: newOrderMeasures,
      },
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '6px 0' }}>
      <Select
        style={{ minWidth: 300, marginRight: '20px' }}
        showSearch
        value={key || undefined}
        onChange={(val) => onChangeOrder(val, 'key')}
        placeholder="选择排序指标"
        options={options}
        allowClear
      />
      <Select
        style={{ minWidth: 120, marginRight: '20px' }}
        value={orderType || undefined}
        onChange={(val) => onChangeOrder(val, 'orderType')}
        placeholder="选择排序方式"
        options={orderOptions}
      />
    </div>
  );
};

export default IndicatorOrder;
