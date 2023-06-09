import { Input, Select } from 'antd';
import React, { useMemo } from 'react';
import type { RecordItem, ColumnType } from './type';
import { useMemoizedFn } from 'ahooks';
import { valueHandle } from './config';

/**
 * 获取options的hooks, 将valueEnum的数据转IOptions形式的数据
 * @param valueEnum
 * @returns
 */
export const useValueEnum: typeof valueHandle = (valueEnum, sig) => {
  const options = useMemo(() => {
    return valueHandle(valueEnum, sig);
  }, [sig, valueEnum]);

  return options;
};

const ControlRender = <DataItem extends RecordItem>(props: {
  item: ColumnType<DataItem>;
  record: DataItem;
  onChange?: (val: any) => void;
  /** 屏蔽 */
  disabled?: boolean;
  /**
   * 修改这一行的数据
   */
  changeRow: (row: DataItem) => void;
}) => {
  const { item, onChange, record, disabled: disabledSource, changeRow } = props;
  const {
    valueEnum,
    renderItem,
    dataIndex,
    fieldProps,
    title,
    disabled: disabledColumn,
  } = item;

  const { disabled: disabledItem } = (record as { disabled?: boolean }) || {};

  const disabled = disabledColumn || disabledItem || disabledSource;

  const options = useValueEnum(valueEnum as Record<string, string>);
  const value = record[dataIndex as keyof DataItem];

  const ele = renderItem?.(value, record, changeRow);

  const changeHandle: typeof onChange = useMemoizedFn((...args) => {
    onChange?.(args[0]);
    if (typeof ele?.props.onChange === 'function') {
      ele?.props.onChange?.(...args);
    }
    if (typeof fieldProps?.onChange === 'function') {
      fieldProps?.onChange?.(...args);
    }
  });

  if (ele) {
    return React.cloneElement(ele, {
      value,
      disabled,
      ...ele.props,
      onChange: changeHandle,
    });
  }

  if (valueEnum) {
    return (
      <Select
        placeholder={`请选择${title}`}
        value={value}
        options={options}
        disabled={disabled}
        {...fieldProps}
        onChange={changeHandle}
      />
    );
  }

  return (
    <Input
      disabled={disabled}
      placeholder={`请输入${title}`}
      value={value}
      options={options}
      {...fieldProps}
      onChange={changeHandle}
    />
  );
};

export default ControlRender;
