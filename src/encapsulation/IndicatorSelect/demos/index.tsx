import { useState } from 'react';
import { IndicatorSelect } from 'tc-rc';
import initSearchFilters, {
  getInitDate,
  getInitFilter,
} from './initSearchFilters';
import searchFilters from './searchFilters.json';
import list from './reportList.json';
import {
  ISearchData,
  IWhereMeasures,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../index';
import initReportList from './initReportList';
import { EQueryType } from '../enum';

const reportList = initReportList(list as any);

const {
  mapGroupToLabelList,
  mapIndicatorNameToDetail,
  flatIndicators,
  mapGroupCnameToSelects,
} = initSearchFilters(searchFilters as ISearchData);

export const getInitWhereMeasures = (): IWhereMeasures => {
  const id = Math.random().toString(36).substr(2);
  return {
    id,
    judge: '>',
    value: undefined,
    key: '',
  };
};

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

export default function () {
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
  return (
    <IndicatorSelect
      {...{
        mapGroupToLabelList,
        mapIndicatorNameToDetail,
        subjects: searchFilters.subjects,
        flatIndicators,
        reportList,
        params,
        paramsShadow: undefined,
        setPartialParams,
        unionOfGroupFilter: [],
        onChangeReport: () => {},
        resetQueryOnParamChange: () => {},
        mapGroupCnameToSelects,
      }}
    />
  );
}
