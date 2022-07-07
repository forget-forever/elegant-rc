import React from 'react';
import classnames from 'classnames';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import {
  IMapGroupCnameToSelects,
  ISubjectItem,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../index';
import SelectGroupItem from '../SelectGroupItem';
import {
  contentItem,
  contentItemLabel,
  contentItemLabelTextCollaps,
  contentItemLabelText,
  contentItemWrapper,
  contentItemCollaps,
} from '../../common';

type IProps = {
  index: number;
  collapsStatus: boolean[];
  setCollapsStatus: (v: boolean[]) => void;
  subject: ISubjectItem;

  params: TDataSourceParams;
  unionOfGroupFilter: string[];
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  generateText: (ele: { explain: string; groupby: string }) => JSX.Element;
  mapGroupCnameToSelects: IMapGroupCnameToSelects;
};

const SelectGroup: React.FC<IProps> = (props) => {
  const {
    index,
    collapsStatus,
    setCollapsStatus,
    subject,
    generateText,
    unionOfGroupFilter,
    params,
    setPartialParams,
    mapGroupCnameToSelects,
  } = props;

  const { title, children } = subject;
  const collaps = collapsStatus[index];
  const setCollaps = (flag: boolean) => {
    const temp = [...collapsStatus];
    temp[index] = flag;
    setCollapsStatus(temp);
  };
  const onCollaps = () => {
    setCollaps(!collaps);
  };

  return (
    <div style={{ ...contentItem, position: 'relative' }}>
      <div style={{ ...contentItemLabel }}>
        <div
          style={collaps ? contentItemLabelText : contentItemLabelTextCollaps}
        >
          {title}
        </div>
      </div>
      <div
        className={classnames(
          {
            selectGroupContent: !collaps,
          },
          {
            selectGroupContentCollaps: collaps,
          },
        )}
        style={{ ...contentItemWrapper }}
      >
        {children.map((groupName) => {
          const selectsItem = mapGroupCnameToSelects.get(groupName);
          return (
            selectsItem && (
              <div key={groupName}>
                <SelectGroupItem
                  params={params}
                  groupName={groupName}
                  collaps={collaps}
                  selectsItem={selectsItem}
                  generateText={generateText}
                  unionOfGroupFilter={unionOfGroupFilter}
                  setPartialParams={setPartialParams}
                />
              </div>
            )
          );
        })}
      </div>
      <div style={contentItemCollaps} onClick={onCollaps}>
        {collaps ? (
          <VerticalAlignBottomOutlined />
        ) : (
          <VerticalAlignTopOutlined />
        )}
        <span style={{ paddingLeft: 5 }}>{collaps ? '展开' : '折叠'}</span>
      </div>
    </div>
  );
};
export default SelectGroup;
