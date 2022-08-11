import React from 'react';
import { Card, Checkbox } from 'antd';
import {
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

type IProps = {
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
};

const ParamData: React.FC<IProps> = (props) => {
  const {
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
  } = props;

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
        <div style={contentItemWrapper}>
          <div hidden={hiddenDelivery}>
            <Delivery params={params} setPartialParams={setPartialParams} />
          </div>
          <div className="paramDataRow">
            <DimGroupSelect
              params={params}
              setPartialParams={setPartialParams}
              mapDimGroupCnameToIndicators={mapDimGroupCnameToIndicators}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ParamDateRangePicker
                params={params}
                setPartialParams={setPartialParams}
                range={dateRangeType}
                diffValue={dateDiffValue}
              />
              <Checkbox
                style={{ marginLeft: 10 }}
                disabled={disableQueryType}
                checked={params.queryType === EQueryType.DAILY}
                onChange={(e) => onChangeQueryType(e.target.checked)}
              >
                按天查询
              </Checkbox>
            </div>
          </div>
          <div>
            <DimFilter
              filterIndex={filterIndex}
              setFilterIndex={setFilterIndex}
              disableHandel={(ele) =>
                !!mapDimNameToDetail.get(ele.name)?.getDisabled(select || [])
              }
              mapDimNameToDetail={mapDimNameToDetail}
              mapDimGroupCnameToIndicators={mapDimGroupCnameToIndicators}
              getSearchList={getSearchList}
            />
          </div>
          {setMoreBtn}
          {showSetMore && (
            <>
              <div>
                <IndicatorFilter
                  params={params}
                  setPartialParams={setPartialParams}
                  mapIndicatorNameToDetail={mapIndicatorNameToDetail}
                />
              </div>
              <div>
                <IndicatorOrder
                  params={params}
                  setPartialParams={setPartialParams}
                  mapIndicatorNameToDetail={mapIndicatorNameToDetail}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ParamData;
