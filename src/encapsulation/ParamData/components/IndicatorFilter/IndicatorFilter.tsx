import React, { useMemo } from 'react';
import { Select, Input, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { whereIcon } from './styles';
import {
  IMapIndicatorNameToDetail,
  IWhereMeasures,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../../IndicatorSelect';

export const getInitWhereMeasures = (): IWhereMeasures => {
  const id = Math.random().toString(36).substr(2);
  return {
    id,
    judge: '>',
    value: undefined,
    key: '',
  };
};

const judgeOptions = [
  {
    value: '>',
    label: '大于',
  },
  {
    value: '<',
    label: '小于',
  },
  {
    value: '=',
    label: '等于',
  },
  {
    value: '≠',
    label: '不等于',
  },
];

type IProps = {
  blockWidth?: number;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
};
const IndicatorFilter: React.FC<IProps> = (props) => {
  const { params, setPartialParams, mapIndicatorNameToDetail, blockWidth } =
    props;

  const {
    json: { select, whereMeasures },
  } = params;

  const options = useMemo<any[]>(() => {
    return Array.isArray(select)
      ? select.map((value) => ({
          label: mapIndicatorNameToDetail.get(value)?.show_name || '',
          value,
        }))
      : [];
  }, [JSON.stringify(select), mapIndicatorNameToDetail]);

  const onChangeWhereMeasures = (
    index: number,
    prop: keyof IWhereMeasures,
    val: string | undefined,
  ) => {
    const newWhereMeasures = [...whereMeasures];
    (newWhereMeasures[index] as any)[prop] = val;
    setPartialParams({
      json: {
        whereMeasures: newWhereMeasures,
      },
    });
  };

  const addAble = whereMeasures.length < select.length;
  const delAble =
    whereMeasures.filter((ele) => !ele.key && !ele.value).length > 0;
  const onAdd = () => {
    setPartialParams({
      json: {
        whereMeasures: [...whereMeasures, getInitWhereMeasures()],
      },
    });
  };
  const onDel = (index: number) => {
    const newWhere = whereMeasures.filter((_, ind) => index !== ind);
    if (newWhere.length === 0) {
      newWhere.push(getInitWhereMeasures());
    }
    setPartialParams({
      json: {
        whereMeasures: newWhere,
      },
    });
  };

  const keySet = new Set(whereMeasures.map((e) => e.key).filter(Boolean));

  return (
    <>
      {whereMeasures.map((whereMeasure, index) => {
        return (
          <Space
            key={whereMeasure.id}
            style={index > 0 ? { marginTop: 10 } : {}}
          >
            <Select
              style={{ minWidth: blockWidth }}
              showSearch
              value={whereMeasure.key || undefined}
              onChange={(val) => onChangeWhereMeasures(index, 'key', val)}
              allowClear
              placeholder="筛选数据指标查询结果"
              options={options.filter(
                (op) => !keySet.has(op.value) || op.value === whereMeasure.key,
              )}
            />
            <Select
              style={{ width: 120 }}
              value={whereMeasure.judge}
              onChange={(val) => onChangeWhereMeasures(index, 'judge', val)}
              options={judgeOptions}
            />
            <Input
              type="number"
              onFocus={(e) =>
                onChangeWhereMeasures(index, 'value', e.target.value)
              }
              onBlur={(e) =>
                onChangeWhereMeasures(index, 'value', e.target.value)
              }
              defaultValue={whereMeasure.value}
              style={{ width: 210 }}
              allowClear
            />
            {index === 0 && (
              <PlusCircleOutlined
                style={{
                  color: '#40a9ff',
                  opacity: addAble ? '1' : '0.4',
                  ...whereIcon,
                }}
                onClick={addAble ? onAdd : undefined}
              />
            )}
            <MinusCircleOutlined
              style={{
                color: '#40a9ff',
                opacity: delAble ? '1' : '0.4',
                ...whereIcon,
              }}
              onClick={() => onDel(index)}
            />
          </Space>
        );
      })}
    </>
  );
};
export default IndicatorFilter;
