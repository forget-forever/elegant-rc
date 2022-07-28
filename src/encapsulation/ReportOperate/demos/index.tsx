import { ReportOperate } from 'tc-rc';
import { Select, Radio, Divider } from 'antd';
import { useEffect, useState } from 'react';
import initSearchFilters from '../utils/initSearchFilters';
import searchFilters from '../../IndicatorSelect/demos/searchFilters.json';
import type { ISearchData } from '../../IndicatorSelect';
import { reportDetail, preinstallDetail } from './reportDetail';

const {
  mapDimNameToDetail,
  mapDimGroupCnameToIndicators,
  mapIndicatorNameToDetail,
} = initSearchFilters(searchFilters as ISearchData);

const { Option, OptGroup } = Select;

const groupOptionsGetter = (checkedIndicators: string[]) =>
  searchFilters.dims.map((item) => (
    <OptGroup label={item.label} key={item.label}>
      {item.option
        .filter((ele) => ele.is_groupby)
        .map(({ name, show_name }) => (
          <Option
            value={name}
            key={name}
            disabled={mapDimNameToDetail
              .get(name)
              ?.getDisabled(checkedIndicators)}
          >
            {show_name}
          </Option>
        ))}
    </OptGroup>
  ));

const themeOptions = [
  '订单规模',
  '收入成本利润',
  '商户管理',
  '用户管理',
  '骑士管理',
  '履约体验',
  'BD销售',
].map((e) => ({
  label: e,
  value: e,
}));

export default function () {
  const [eg, setEg] = useState(0);
  const [initialValues, setInitialValues] = useState({
    selects: [] as string[],
    groupByDate: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReportDetail = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      const {
        result: { data },
      } = [reportDetail, preinstallDetail][eg];
      const _initialValues = {
        reportOrPreinstall: data.reportOrPreinstall,
        reportName: data.reportName,
        reportTheme: data.reportTheme,
        dateType: data.dateType,
        selects: data.dimMeaConfig.selects.map((e) => e.value),
        group: data.dimMeaConfig.group,
        groupByDate: Number(data.groupByDate) || 0,
        dateTypeConfigBo: data.dateTypeConfigBo,
        condition: data.dimMeaConfig.condition,
      };

      setInitialValues(_initialValues);
    };

    getReportDetail().finally(() => {
      setLoading(false);
    });
  }, [eg]);

  const onClickSubmit = (...arg: any[]) => {
    console.log(arg);
  };

  return (
    <>
      <Radio.Group onChange={(e) => setEg(e.target.value)} value={eg}>
        <Radio value={0}>预设组 示例</Radio>
        <Radio value={1}>报表 示例</Radio>
      </Radio.Group>
      <Divider />
      <ReportOperate
        key={JSON.stringify(initialValues)}
        loading={loading}
        searchData={searchFilters as ISearchData}
        themeOptions={themeOptions}
        onClickSubmit={onClickSubmit}
        onClickCancel={() => {}}
        initialValues={initialValues}
        getSearchList={async ({ where_name, keyword }) => {
          return {
            data: Array.from({ length: 4 }).map((_, index) => ({
              label: `测试数据${where_name || index}-${keyword || index}`,
              value: index,
            })),
          };
        }}
      />
    </>
  );
}
