import { getInitFilter } from '../DimFilter/getInitFilter';
import getInitDate from '../ParamData/components/ParamDateRangePicker/getInitDate';
import { getInitWhereMeasures } from '../ParamData/components/IndicatorFilter/IndicatorFilter';
import { EQueryType } from './enum';
import { useState } from 'react';
import { TDataSourceParams, TDataSourceParamsPartial } from './index';

const initParams = {
  isasync: true,
  isdownload: false,
  json: {
    select: [],
    groupby: [],
    where: [getInitFilter()],
    daterange: getInitDate().map((item) => item.format('YYYYMMDD')),
    orderMeasures: [
      {
        orderType: 'asc' as const,
        key: '',
      },
    ] as any,
    whereMeasures: [getInitWhereMeasures()],
  },
  current: 1,
  queryType: EQueryType.DAILY,
  isinfo: false,
  isRefresh: false,
  isImpala: false,
  deliveryType: 1,
};

export default function useParamsState() {
  const [params, setParams] = useState<TDataSourceParams>(initParams as any);

  const setPartialParams = (pay: TDataSourceParamsPartial) =>
    setParams((p) => {
      return {
        ...p,
        ...pay,
        json: {
          ...p.json,
          ...pay?.json,
        },
      };
    });

  return {
    params,
    setPartialParams,
  };
}
