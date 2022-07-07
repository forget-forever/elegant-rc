import React, { useMemo } from 'react';
import { Select, Input } from 'antd';
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
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
};
const IndicatorFilter: React.FC<IProps> = (props) => {
  const { params, setPartialParams, mapIndicatorNameToDetail } = props;

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {whereMeasures.map((whereMeasure, index) => {
          return (
            <div
              key={whereMeasure.id}
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                margin: '6px 0',
              }}
            >
              <Select
                style={{ minWidth: 300, marginRight: '20px' }}
                showSearch
                value={whereMeasure.key || undefined}
                onChange={(val) => onChangeWhereMeasures(index, 'key', val)}
                allowClear
                placeholder="筛选数据指标查询结果"
                options={options.filter(
                  (op) =>
                    !keySet.has(op.value) || op.value === whereMeasure.key,
                )}
              />
              <Select
                style={{ width: 120, marginRight: '20px' }}
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
                style={{ width: 200, marginRight: 20 }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default IndicatorFilter;
