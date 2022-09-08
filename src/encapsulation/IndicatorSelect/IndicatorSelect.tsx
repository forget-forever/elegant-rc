import React, { useCallback, useMemo } from 'react';
import { Card } from 'antd';
import ShortCut from './components/ShortCut';
import { IShortCutProps } from './components/ShortCut/ShortCut';
import SelectSubject from './components/SelectSubject';
import useCollapsState from './useCollapsState';
import {
  IMapGroupCnameToSelects,
  IMapIndicatorNameToDetail,
  ISubjects,
} from './index';
import { ISubjectProps } from './components/SelectSubject/SelectSubject';
import SelectSum from './components/SelectSum';
import { ISelectSumProps } from './components/SelectSum/SelectSum';

const bodyStyle = {
  display: 'flex',
  marginBottom: '1px',
  alignItems: 'center',
  padding: 0,
  maxWidth: '100%',
};

type IProps = Omit<
  IShortCutProps,
  ['allCollaps', 'setAllCollaps', 'unionOfGroupFilter'][number]
> & {
  maxHeight?: number | string;
  mapGroupToLabelList: Record<string, string[]>;
  subjects: ISubjects;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  mapGroupCnameToSelects: IMapGroupCnameToSelects;
};

const IndicatorSelect: React.FC<IProps> = (props) => {
  const {
    maxHeight = 400,
    initConfigId,
    offsetTop,
    top,
    zIndex,
    params,
    paramsShadow,
    setPartialParams,
    flatIndicators,
    reportList,
    onChangeReport,
    resetQueryOnParamChange,

    subjects,
    mapGroupToLabelList,
    mapIndicatorNameToDetail,
    mapGroupCnameToSelects,
  } = props;

  const unionOfGroupFilter = useMemo(() => {
    return [
      ...new Set(params.json.groupby),
      ...new Set(params.json.where.map((e) => e.key)),
    ].filter(Boolean);
  }, [
    JSON.stringify([
      [...params.json.groupby].sort(),
      params.json.where.map((e) => e.key).sort(),
    ]),
  ]);

  const { allCollaps, setAllCollaps, collapsStatus, setCollapsStatus } =
    useCollapsState(subjects);

  const shortCutProps: IShortCutProps = {
    initConfigId,
    offsetTop,
    top,
    zIndex,
    params,
    paramsShadow,
    setPartialParams,
    allCollaps,
    setAllCollaps,
    flatIndicators,
    reportList,
    onChangeReport,
    resetQueryOnParamChange,
    unionOfGroupFilter,
  };

  const generateText = useCallback(
    (ele: { explain: string; groupby: string }) => {
      const define = `【指标定义】${ele.explain}`;
      const belong = `【可选分组】${mapGroupToLabelList[ele.groupby]?.join(
        '、',
      )}`;
      return (
        <div style={{ color: '#000', fontSize: 10, fontWeight: 600 }}>
          <div style={{ marginBottom: 10 }}>{define}</div>
          {belong}
        </div>
      );
    },
    [mapGroupToLabelList],
  );

  const selectSubjectProps: ISubjectProps = {
    allCollaps,
    collapsStatus,
    setCollapsStatus,

    params,
    setPartialParams,
    generateText,
    subjects,
    mapGroupCnameToSelects,
    unionOfGroupFilter,
  };

  const selectSumProps: ISelectSumProps = {
    params,
    allCollaps,
    generateText,
    setPartialParams,
    mapIndicatorNameToDetail,
  };

  return (
    <Card
      bodyStyle={bodyStyle}
      bordered={false}
      style={{ maxHeight, overflow: 'auto' }}
    >
      <div style={{ flex: 1, maxWidth: '100%' }}>
        <ShortCut {...shortCutProps} />
        <SelectSubject {...selectSubjectProps} />
        <SelectSum {...selectSumProps} />
      </div>
    </Card>
  );
};
export default IndicatorSelect;
