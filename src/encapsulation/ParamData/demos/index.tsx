import { Input } from 'antd';
import { ParamData } from 'elegant-rc';
import useParamsState from '../../IndicatorSelect/useParamsState';
import initSearchFilters from '../../ReportOperate/utils/initSearchFilters';
import searchFilters from '../../IndicatorSelect/demos/searchFilters.json';
import type { ISearchData } from '../../IndicatorSelect';
import { useMemo, useState } from 'react';

const {
  mapIndicatorNameToDetail,
  mapDimNameToDetail,
  mapDimGroupCnameToIndicators,
} = initSearchFilters(searchFilters as ISearchData);

export default function () {
  const { params, setPartialParams } = useParamsState();
  const [json, setJson] = useState('');
  const config = useMemo(() => {
    let obj = {};
    try {
      obj = JSON.parse(json);
    } catch (e) {
      console.log(e, 'parse error');
    }
    return obj;
  }, [json]);

  return (
    <>
      <Input.TextArea
        placeholder="写入JSON对象进行配置"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <ParamData
        hiddenDelivery={false}
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
        otherOption={{
          showSaas: false,
        }}
        {...config}
      />
    </>
  );
}
