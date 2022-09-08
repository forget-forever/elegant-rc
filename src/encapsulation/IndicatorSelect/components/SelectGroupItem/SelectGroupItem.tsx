import React, { useCallback, useMemo, useState } from 'react';
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
import SelectCheckGroup from '../SelectCheckGroup';

const CheckboxGroup = Checkbox.Group;

type IProps = {
  params: TDataSourceParams;
  groupName: string;
  collaps: boolean;
  selectsItem: IIndicatorDetail[];
  unionOfGroupFilter: string[];
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  // eslint-disable-next-line no-undef
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

  const [entered, setEntered] = useState(false);

  const onMouseEnter = useCallback(() => {
    setEntered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setEntered(false);
  }, []);

  const getNewSelect = useCallback(
    (flagGetter: (arg: string) => boolean) => {
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
    },
    [entered && select.join()],
  );

  const onChangeAll = (flag: boolean) => {
    setPartialParams({
      json: {
        select: getNewSelect(() => flag),
      },
    });
  };

  const onChange = useCallback(
    (checkedValues: string[]) => {
      setPartialParams({
        json: {
          select: getNewSelect((ele) => checkedValues.includes(ele)),
        },
      });
    },
    [getNewSelect],
  );

  const groupNameNode = useMemo(() => {
    return groupName === '利润相关' ? (
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
  }, [groupName]);

  const checkedValues = intersection(select, itemValues);

  return (
    <div
      className="module"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
            <SelectCheckGroup
              key={groupName}
              generateText={generateText}
              unionOfGroupFilter={unionOfGroupFilter}
              deliveryType={deliveryType}
              selectsItem={selectsItem}
              checkedValues={checkedValues}
              onChange={onChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SelectGroupItem;
