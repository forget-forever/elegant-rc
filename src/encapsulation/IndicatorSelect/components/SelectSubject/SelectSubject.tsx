import React from 'react';
import {
  IMapGroupCnameToSelects,
  ISubjects,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../..';
import './index.css';
import SelectGroup from '../SelectGroup';

export type ISubjectProps = {
  allCollaps: boolean;
  collapsStatus: boolean[];
  setCollapsStatus: (v: boolean[]) => void;

  params: TDataSourceParams;
  unionOfGroupFilter: string[];
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  generateText: (ele: { explain: string; groupby: string }) => JSX.Element;
  subjects: ISubjects;
  mapGroupCnameToSelects: IMapGroupCnameToSelects;
};

const SelectSubject: React.FC<ISubjectProps> = (props) => {
  const {
    allCollaps,
    collapsStatus,
    setCollapsStatus,

    params,
    unionOfGroupFilter,
    setPartialParams,
    generateText,
    subjects,
    mapGroupCnameToSelects,
  } = props;

  return (
    <div
      className={'selectSubjectContainer'}
      style={{ ...(allCollaps ? { display: 'none' } : {}) }}
    >
      {subjects &&
        subjects.map((subject, index) => (
          <SelectGroup
            params={params}
            setPartialParams={setPartialParams}
            index={index}
            collapsStatus={collapsStatus}
            setCollapsStatus={setCollapsStatus}
            key={subject.title}
            subject={subject}
            generateText={generateText}
            unionOfGroupFilter={unionOfGroupFilter}
            mapGroupCnameToSelects={mapGroupCnameToSelects}
          />
        ))}
    </div>
  );
};

export default SelectSubject;
