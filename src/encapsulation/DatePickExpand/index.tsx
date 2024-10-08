import { useMemoizedFn } from 'ahooks';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import React, { useLayoutEffect, useMemo } from 'react';
import type { MyOmit, FormProps } from 'elegant-rc';
import datJs from 'dayjs';

const format = 'YYYYMMDD';

export const DatePickerExpand: React.FC<
  MyOmit<DatePickerProps, 'value' | 'onChange'> &
    FormProps<
      string,
      {
        /** 能选择的最大日期 */
        maxDate?: string;
        /** 能选择的最小日期 */
        minDate?: string;
        /** 屏蔽的日期, 可以写一天一天，也可以写时间段 */
        disabledDates?: (string | [string, string])[];
        /**
         * 值需要整合的format
         * @default 'YYYY-MM-DD HH:mm:ss'
         */
        valueFormat?: string;
        /** 当日期被屏蔽时，清除选择的日期 */
        clearWhenDateDisabled?: boolean;
        // maxTime: string;
        // minTime: string;
      }
    >
> = (props) => {
  const {
    maxDate,
    minDate,
    disabledDates,
    value,
    onChange,
    valueFormat = 'YYYY-MM-DD HH:mm:ss',
    clearWhenDateDisabled,
    ...resetProps
  } = props;

  const disabledDataHandle = useMemoizedFn<
    Required<DatePickerProps>['disabledDate']
  >((currentSource) => {
    if (!currentSource) {
      return false;
    }
    const current = Number(currentSource.format(format));
    /** 判断屏蔽时间列表 */
    if (
      disabledDates?.some((ele) => {
        if (Array.isArray(ele)) {
          if (ele.length < 2) {
            return false;
          }
          return (
            current > Number(datJs(ele[0]).format(format)) &&
            current < Number(datJs(ele[1]).format(format))
          );
        }
        return Number(datJs(ele).format('YYYYMMDD')) === current;
      })
    ) {
      return true;
    }
    /** 屏蔽最大最小日期 */
    if (maxDate && minDate) {
      return (
        current > Number(datJs(maxDate).format(format)) ||
        current < Number(datJs(minDate).format(format))
      );
    }
    if (maxDate) {
      return current > Number(datJs(maxDate).format(format));
    }
    if (minDate) {
      return current < Number(datJs(minDate).format(format));
    }
    return false;
  });

  const valueRes = useMemo(() => {
    if (!value) {
      return undefined;
    }
    return datJs(value, valueFormat);
  }, [value, valueFormat]);

  const changeHandle = useMemoizedFn((val?: datJs.Dayjs | null) => {
    if (!val) {
      onChange?.(undefined);
      return;
    }
    onChange?.(datJs(val).format(valueFormat));
  });

  useLayoutEffect(() => {
    if (clearWhenDateDisabled && value) {
      if (disabledDataHandle(datJs(value))) {
        changeHandle?.(undefined);
      }
    }
  }, [
    changeHandle,
    clearWhenDateDisabled,
    disabledDataHandle,
    maxDate,
    minDate,
    value,
  ]);

  return (
    /** @ts-ignore */
    <DatePicker
      disabledDate={disabledDataHandle}
      onChange={changeHandle}
      value={valueRes}
      allowClear
      {...resetProps}
    />
  );
};
