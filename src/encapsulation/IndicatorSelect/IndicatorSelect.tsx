import React from 'react';
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

type IProps = Omit<IShortCutProps, ['allCollaps', 'setAllCollaps'][number]> & {
  mapGroupToLabelList: Record<string, string[]>;
  subjects: ISubjects;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  mapGroupCnameToSelects: IMapGroupCnameToSelects;
};

const IndicatorSelect: React.FC<IProps> = (props) => {
  const {
    offsetTop,
    params,
    paramsShadow,
    setPartialParams,
    unionOfGroupFilter,
    flatIndicators,
    reportList,
    onChangeReport,
    resetQueryOnParamChange,

    subjects,
    mapGroupToLabelList,
    mapIndicatorNameToDetail,
    mapGroupCnameToSelects,
  } = props;

  const { allCollaps, setAllCollaps, collapsStatus, setCollapsStatus } =
    useCollapsState(subjects);

  const shortCutProps: IShortCutProps = {
    offsetTop,
    params,
    paramsShadow,
    setPartialParams,
    allCollaps,
    setAllCollaps,
    unionOfGroupFilter,
    flatIndicators,
    reportList,
    onChangeReport,
    resetQueryOnParamChange,
  };

  const generateText = (ele: { explain: string; groupby: string }) => {
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
  };

  const selectSubjectProps: ISubjectProps = {
    allCollaps,
    collapsStatus,
    setCollapsStatus,

    params,
    unionOfGroupFilter,
    setPartialParams,
    generateText,
    subjects,
    mapGroupCnameToSelects,
  };

  const selectSumProps: ISelectSumProps = {
    params,
    allCollaps,
    generateText,
    setPartialParams,
    mapIndicatorNameToDetail,
  };

  return (
    <Card bodyStyle={bodyStyle} bordered={false}>
      <div style={{ flex: 1, maxWidth: '100%' }}>
        <ShortCut {...shortCutProps} />
        <SelectSubject {...selectSubjectProps} />
        <SelectSum {...selectSumProps} />
      </div>
    </Card>
  );
};
export default IndicatorSelect;
