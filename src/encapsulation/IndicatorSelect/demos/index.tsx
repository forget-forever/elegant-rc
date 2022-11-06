import { IndicatorSelect } from 'elegant-rc';
import initSearchFilters from '../../ReportOperate/utils/initSearchFilters';
import searchFilters from './searchFilters.json';
import list from './reportList.json';
import type { ISearchData } from '../index';
import initReportList from './initReportList';
import useParamsState from '../useParamsState';
import { Divider } from 'antd';

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
    <div>
      <IndicatorSelect
        {...{
          offsetTop: 60,
          top: 0,
          maxHeight: 400,
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
      <Divider />
      <IndicatorSelect
        {...{
          offsetTop: 60,
          // top: 0,
          maxHeight: 'auto',
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
    </div>
  );
}
