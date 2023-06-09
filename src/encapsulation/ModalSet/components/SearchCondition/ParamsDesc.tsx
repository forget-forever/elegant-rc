import React from 'react';
import {
  IMapDimNameToDetail,
  IMapIndicatorNameToDetail,
  TDataSourceParams,
} from 'src/encapsulation/IndicatorSelect';
import { EQueryType } from '../../../IndicatorSelect/enum';
import CommonCondition from './CommonCondition';

const orderTypeMap = { asc: '升序', desc: '降序' };
const deliveryTypeMap = {
  1: '自配送',
  2: '第三方配送',
  3: '自配送+第三方配送',
};

const saasTypeMap = {
  1: '剔除Saas业务数据',
  2: 'Saas业务数据',
  3: '剔除Saas业务数据+Saas业务数据',
};

type IProps = {
  params: TDataSourceParams;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  mapDimNameToDetail: IMapDimNameToDetail;
  compactParamsJson: (
    json: Required<TDataSourceParams>['json'],
  ) => Required<TDataSourceParams>['json'];
};

const ParamsDesc: React.FC<IProps> = (props) => {
  const {
    params,
    mapDimNameToDetail,
    mapIndicatorNameToDetail,
    compactParamsJson,
  } = props;
  const { json, deliveryType, queryType, saasType } = params;
  const jsonFiltered = compactParamsJson(json);
  const { select, groupby, daterange, where, whereMeasures, orderMeasures } =
    jsonFiltered;

  const deliveryTypeDesc = deliveryTypeMap[deliveryType];
  const saasTypeDesc = saasTypeMap[saasType];

  const selectDesc = select
    .map((s) => mapIndicatorNameToDetail.get(s)?.show_name)
    .filter(Boolean)
    .join();
  const groupByDesc = groupby
    .map((g) => mapDimNameToDetail.get(g)?.show_name)
    .filter(Boolean)
    .join();
  const whereDesc = where
    .map((w) => {
      const showName = mapDimNameToDetail.get(w.key)?.show_name;
      const list = [showName, w.judge, w.value.join()];
      return list.every(Boolean) && list.join('');
    })
    .filter(Boolean)
    .join();
  const whereMeasuresDesc = whereMeasures
    .map((wm) => {
      const showName = mapDimNameToDetail.get(wm.key)?.show_name;
      const list = [showName, wm.judge, wm.value];
      return (list.every(Boolean) && list.join('')) || '';
    })
    .filter(Boolean)
    .join(';');

  const orderMeasuresDesc = orderMeasures
    .map((om) => {
      const showName = mapDimNameToDetail.get(om.key)?.show_name;
      const orderTypeDesc = orderTypeMap[om.orderType];
      const list = [showName, orderTypeDesc];
      return (list.every(Boolean) && list.join()) || '';
    })
    .filter(Boolean)
    .join(';');

  const descRecord = {
    Saas: saasTypeDesc,
    配送类型: deliveryTypeDesc,
    选择指标: selectDesc,
    日期范围: daterange.join('-'),
    按天查询: queryType === EQueryType.DAILY ? '是' : '否',
    分组条件: groupByDesc,
    筛选条件: whereDesc,
    过滤条件: whereMeasuresDesc,
    排序条件: orderMeasuresDesc,
  };

  const descList = Object.entries(descRecord)
    .filter((e) => e[1])
    .map(([blockName, blockInfo]) => ({ blockName, blockInfo }));
  return (
    <>
      {descList.map(({ blockName, blockInfo }) => {
        return (
          <CommonCondition
            key={blockName}
            blockName={blockName}
            blockInfo={blockInfo}
          />
        );
      })}
    </>
  );
};

export default ParamsDesc;
