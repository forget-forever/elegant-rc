import { ParamData } from 'elegant-rc';
import useParamsState from '../../IndicatorSelect/useParamsState';
import initSearchFilters from '../../ReportOperate/utils/initSearchFilters';
import searchFilters from '../../IndicatorSelect/demos/searchFilters.json';
import type { ISearchData } from '../../IndicatorSelect';

const {
  mapIndicatorNameToDetail,
  mapDimNameToDetail,
  mapDimGroupCnameToIndicators,
} = initSearchFilters(searchFilters as ISearchData);

export default function () {
  const { params, setPartialParams } = useParamsState();

  return (
    <ParamData
      {...{
        params,
        setPartialParams,
        mapIndicatorNameToDetail,
        mapDimNameToDetail,
        mapDimGroupCnameToIndicators,
      }}
      dateRangeType="month"
      dateDiffValue={0}
      getSearchList={async ({ where_name, keyword }) => {
        return {
          data: Array.from({ length: 4 }).map((_, index) => ({
            label: `测试数据${where_name || index}-${keyword || index}`,
            value: index,
          })),
        };
      }}
    />
  );
}
