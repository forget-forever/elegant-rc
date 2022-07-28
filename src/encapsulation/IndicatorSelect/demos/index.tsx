import { IndicatorSelect } from 'tc-rc';
import initSearchFilters from '../../ReportOperate/utils/initSearchFilters';
import searchFilters from './searchFilters.json';
import list from './reportList.json';
import type { ISearchData } from '../index';
import initReportList from './initReportList';
import useParamsState from '../useParamsState';

const reportList: any = initReportList(list as any);

const {
  mapGroupToLabelList,
  mapIndicatorNameToDetail,
  flatIndicators,
  mapGroupCnameToSelects,
} = initSearchFilters(searchFilters as ISearchData);

export default function () {
  const { params, setPartialParams } = useParamsState();
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
