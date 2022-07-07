// @ts-ignore
import React, { useState, useMemo } from 'react';
import { Select } from 'antd';
import {
  IDimDetail,
  IMapDimGroupCnameToIndicators,
} from '../../../IndicatorSelect';

const { Option, OptGroup } = Select;

type IArg = {
  select: string[];
  mapDimGroupCnameToIndicators: IMapDimGroupCnameToIndicators;
};
export function useGroupOptions(arg: IArg) {
  const { select, mapDimGroupCnameToIndicators } = arg;

  const [value, setValue] = useState<string>('');
  const onSearch = (s: string) => setValue(s);

  const filterOption = (inputValue: string, option: any) => {
    const trimInput = inputValue.trim();
    setValue(trimInput);
    const { options, children } = option;
    if (Array.isArray(options)) {
      return options.some((op) => op.children.includes(trimInput));
    }
    return children.includes(trimInput);
  };

  const options = useMemo(() => {
    const source = [...mapDimGroupCnameToIndicators.entries()];
    const newSource = source
      .map(([label, option]) => {
        const newOptions = option.filter((op: IDimDetail) => {
          return op.show_name.includes(value);
        });
        return {
          label,
          option: newOptions,
        };
      })
      .filter((ele) => {
        return ele.option.length > 0;
      });
    return newSource.map((item) => (
      <OptGroup label={item.label} key={item.label}>
        {item.option
          .filter(
            (ele: IDimDetail) =>
              ele.is_groupby && ele.show_name.includes(value),
          )
          .map(({ name, show_name, getDisabled }: IDimDetail) => (
            <Option value={name} key={name} disabled={getDisabled?.(select)}>
              {show_name}
            </Option>
          ))}
      </OptGroup>
    ));
  }, [mapDimGroupCnameToIndicators, JSON.stringify({ value, select })]);

  return {
    onSearch,
    options,
    filterOption,
    setValue,
  };
}
