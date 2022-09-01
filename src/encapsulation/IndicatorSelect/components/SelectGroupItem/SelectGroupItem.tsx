import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { intersection } from 'lodash';
import type {
  IIndicatorDetail,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../index';
import { DeliveryType } from '../../enum';

const CheckboxGroup = Checkbox.Group;

type IProps = {
  params: TDataSourceParams;
  groupName: string;
  collaps: boolean;
  selectsItem: IIndicatorDetail[];
  unionOfGroupFilter: string[];
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  generateText: (ele: { explain: string; groupby: string }) => JSX.Element;
};

const SelectGroupItem: React.FC<IProps> = (props) => {
  const {
    params,
    groupName,
    collaps,
    selectsItem,
    unionOfGroupFilter,
    setPartialParams,
    generateText,
  } = props;
  const {
    json: { select },
    deliveryType,
  } = params;
  const groupChecked = selectsItem.every((ele) => select.includes(ele.name));
  const groupIndeterminate =
    selectsItem.some((ele) => select.includes(ele.name)) && !groupChecked;
  const itemValues = selectsItem.map((e) => e.name);

  const getNewSelect = (flagGetter: (arg: string) => boolean) => {
    const selectSet = new Set(select);
    itemValues.forEach((ele) => {
      const flag = flagGetter(ele);
      if (flag) {
        selectSet.add(ele);
      } else {
        selectSet.delete(ele);
      }
    });
    return [...selectSet];
  };
  const onChangeAll = (flag: boolean) => {
    setPartialParams({
      json: {
        select: getNewSelect(() => flag),
      },
    });
  };

  const onChange = (checkedValues: string[]) => {
    setPartialParams({
      json: {
        select: getNewSelect((ele) => checkedValues.includes(ele)),
      },
    });
  };

  const groupNameNode =
    groupName === '利润相关' ? (
      <Tooltip
        title={
          <div style={{ color: '#000', fontSize: 10, fontWeight: 600 }}>
            专职的固定成本暂未包含
          </div>
        }
        mouseEnterDelay={0.3}
        color="#fff"
        overlayStyle={{ maxWidth: '500px' }}
      >
        {groupName}
        <QuestionCircleOutlined
          style={{ marginLeft: '5px', color: '#D0D0D0' }}
        />
      </Tooltip>
    ) : (
      groupName
    );

  const checkedValues = intersection(select, itemValues);

  return (
    <div className="module">
      {selectsItem && (
        <>
          <div>
            <Checkbox
              indeterminate={groupIndeterminate}
              checked={groupChecked}
              onChange={(e) => onChangeAll(e.target.checked)}
              disabled={selectsItem?.some((ele) =>
                ele?.getDisabled(unionOfGroupFilter),
              )}
            >
              {groupNameNode}
            </Checkbox>
          </div>
          <div hidden={collaps}>
            <CheckboxGroup
              className="checkGroup"
              onChange={(vals) => onChange(vals as string[])}
              value={checkedValues}
            >
              {selectsItem.map((item) => {
                const checked = select.includes(item.name);
                return (
                  <Checkbox
                    className="index"
                    key={item.name}
                    value={item.name}
                    disabled={item?.getDisabled(unionOfGroupFilter)}
                  >
                    {item.show_name.length > 13
                      ? `${item.show_name.slice(0, 12)}...`
                      : item.show_name}
                    <Tooltip
                      title={() => generateText(item)}
                      mouseEnterDelay={0.3}
                      color="#fff"
                      overlayStyle={{ maxWidth: '500px' }}
                      placement="bottom"
                      autoAdjustOverflow
                    >
                      {[DeliveryType.OTHER, DeliveryType.ALL].includes(
                        deliveryType,
                      ) && item.is_external ? (
                        <ExclamationCircleOutlined
                          style={{ marginLeft: '5px', color: '#D0D0D0' }}
                          className={classnames('externalIcon', {
                            externalIconChecked: checked,
                          })}
                        />
                      ) : (
                        <QuestionCircleOutlined
                          style={{ marginLeft: '5px', color: '#D0D0D0' }}
                        />
                      )}
                    </Tooltip>
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectGroupItem;
