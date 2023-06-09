import React from 'react';
import { Card, Checkbox, Space } from 'antd';
import type {
  IFilterChecked,
  IMapDimGroupCnameToIndicators,
  IMapDimNameToDetail,
  IMapIndicatorNameToDetail,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../IndicatorSelect';

import './index.css';
import { useSetMoreBtn } from './useSetMoreBtn';
import Delivery from './components/Delivery';
import DimGroupSelect from './components/DimGroupSelect';
import IndicatorFilter from './components/IndicatorFilter';
import IndicatorOrder from './components/IndicatorOrder';
import DimFilter from '../DimFilter';
import ParamDateRangePicker from './components/ParamDateRangePicker';
import { EQueryType } from '../IndicatorSelect/enum';
import {
  contentItem,
  contentItemLabel,
  contentItemWrapper,
} from '../IndicatorSelect/common';
import SaasCheckbox from './components/SaasCheckbox';

type IProps = {
  disabledOther?: boolean;
  hiddenDelivery?: boolean;
  disableQueryType?: boolean;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapDimNameToDetail: IMapDimNameToDetail;
  mapDimGroupCnameToIndicators: IMapDimGroupCnameToIndicators;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  getSearchList: (params: {
    where_name: string;
    keyword?: string;
  }) => Promise<any>;
  dateRangeType: 'month' | 'day';
  dateDiffValue: number;
  otherOption?: Record<string, any> & {
    showSaas?: boolean;
    blockWidth?: number;
  };
};

const ParamData: React.FC<IProps> = (props) => {
  const {
    disabledOther = false,
    params,
    setPartialParams,
    mapDimNameToDetail,
    hiddenDelivery = false,
    mapDimGroupCnameToIndicators,
    mapIndicatorNameToDetail,
    getSearchList,
    disableQueryType = false,
    dateDiffValue,
    dateRangeType,
    otherOption,
  } = props;

  const showSaas = otherOption?.showSaas || false;
  const blockWidth = otherOption?.blockWidth ?? 340;

  const {
    json: { where, select },
  } = params;

  const setFilterIndex = (val: IFilterChecked[]) => {
    setPartialParams({
      json: {
        where: val,
      },
    });
  };
  const { setMoreBtn, showSetMore } = useSetMoreBtn();

  const filterIndex = where.map((ele) => {
    return {
      ...ele,
      id: Math.random(),
    };
  });

  const onChangeQueryType = (b: boolean) => {
    setPartialParams({
      queryType: b ? EQueryType.DAILY : EQueryType.ALL,
    });
  };

  return (
    <Card bordered={false} bodyStyle={{ padding: 0, maxWidth: '100%' }}>
      <div style={{ ...contentItem }}>
        <div style={{ ...contentItemLabel }}>数据设置</div>
        <Space style={contentItemWrapper} direction="vertical">
          {(!hiddenDelivery || showSaas) && (
            <Space>
              {!hiddenDelivery && (
                <Delivery
                  blockWidth={blockWidth}
                  params={params}
                  setPartialParams={setPartialParams}
                  disabledOther={disabledOther}
                />
              )}
              {showSaas && (
                <SaasCheckbox
                  blockWidth={blockWidth}
                  params={params}
                  setPartialParams={setPartialParams}
                />
              )}
            </Space>
          )}
          <Space align="start">
            <DimGroupSelect
              blockWidth={blockWidth}
              params={params}
              setPartialParams={setPartialParams}
              mapDimGroupCnameToIndicators={mapDimGroupCnameToIndicators}
            />
            <ParamDateRangePicker
              params={params}
              setPartialParams={setPartialParams}
              range={dateRangeType}
              diffValue={dateDiffValue}
            />
            <Checkbox
              style={{ marginTop: 5 }}
              disabled={disableQueryType}
              checked={params.queryType === EQueryType.DAILY}
              onChange={(e) => onChangeQueryType(e.target.checked)}
            >
              按天查询
            </Checkbox>
          </Space>
          <DimFilter
            blockWidth={blockWidth}
            filterIndex={filterIndex}
            setFilterIndex={setFilterIndex}
            disableHandel={(ele) =>
              !!mapDimNameToDetail.get(ele.name)?.getDisabled(select || [])
            }
            mapDimNameToDetail={mapDimNameToDetail}
            mapDimGroupCnameToIndicators={mapDimGroupCnameToIndicators}
            getSearchList={getSearchList}
          />
          {setMoreBtn}
          {showSetMore && (
            <>
              <IndicatorFilter
                params={params}
                setPartialParams={setPartialParams}
                mapIndicatorNameToDetail={mapIndicatorNameToDetail}
              />
              <IndicatorOrder
                params={params}
                setPartialParams={setPartialParams}
                mapIndicatorNameToDetail={mapIndicatorNameToDetail}
              />
            </>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default ParamData;
