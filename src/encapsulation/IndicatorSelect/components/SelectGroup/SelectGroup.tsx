import React from 'react';
import commonStyles from '../../common.less';
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
import styles from './index.less';
import SelectGroupItem from '../SelectGroupItem';

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
    <div className={commonStyles.contentItem} style={{ position: 'relative' }}>
      <div className={commonStyles.contentItemLabel}>
        <div
          className={classnames({
            [commonStyles.contentItemLabelText]: collaps,
            [commonStyles.contentItemLabelTextCollaps]: !collaps,
          })}
        >
          {title}
        </div>
      </div>
      <div
        className={classnames(
          {
            [styles.selectGroupContent]: !collaps,
          },
          commonStyles.contentItemWrapper,
          {
            [styles.selectGroupContentCollaps]: collaps,
          },
        )}
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
      <div className={commonStyles.contentItemCollaps} onClick={onCollaps}>
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
