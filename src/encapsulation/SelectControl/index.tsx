/*
 * @Author: zml
 * @Date: 2022-06-29 10:52:07
 * @LastEditTime: 2022-07-26 19:08:44
 */
import type {
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
} from '@ant-design/pro-utils';
import { Select } from 'antd';
import type {
  BaseOptionType,
  DefaultOptionType,
  SelectProps,
} from 'antd/lib/select';
import React, { useMemo } from 'react';

/**
 * 在antd的Select组件的基础上增加multiple和Tags模式下支持允许最大数目的限制等功能
 * @returns
 */
const SelectControl = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: {
    /** 允许选择的最大条数 */
    maxCount?: number;
    /** 数据的枚举，这个可以代替options */
    valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
    /** 在传入valueEnum时需要屏蔽的值, valueEnum是object的时候会强行转string */
    disabledList?: React.ReactText[];
  } & SelectProps<ValueType, OptionType>,
) => {
  const {
    options,
    valueEnum,
    value,
    maxCount,
    disabledList = [],
    ...resetProps
  } = props;

  const optionsConf = useMemo(() => {
    const resOptions = options || [];

    if (!options) {
      if (valueEnum instanceof Map) {
        valueEnum.forEach((label, val) => {
          /** @ts-ignore */
          resOptions.push({
            value: val,
            label,
            disabled: disabledList.includes(val),
          });
        });
      } else if (valueEnum instanceof Object) {
        /** 应为object的键只能是string类型，所以说这个地方应该转成string类型 */
        const disabledListStr = disabledList.map(String);
        Object.keys(valueEnum).forEach((key) => {
          /** @ts-ignore */
          resOptions.push({
            value: key,
            label: valueEnum[key],
            disabled: disabledListStr.includes(key),
          });
        });
      }
    }

    if (typeof maxCount !== 'number' || !(value instanceof Array)) {
      return resOptions;
    }

    return resOptions.map((item) => {
      if (value.length >= maxCount && !value.includes(item.value)) {
        return { ...item, disabled: true };
      }
      return item;
    });
  }, [disabledList, maxCount, options, value, valueEnum]);

  return <Select value={value} options={optionsConf} {...resetProps} />;
};

export default SelectControl;
