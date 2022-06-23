/*
 * @Author: zml
 * @Date: 2022-06-22 20:16:17
 * @LastEditTime: 2022-06-23 14:25:11
 */
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useMemoizedFn } from 'ahooks';
import type { RangeValue } from 'rc-picker/lib/interface';

type PickerType = typeof DatePicker.RangePicker;

type ValueType = RangeValue<moment.Moment>;
type RangePickerProps = ConstructorParameters<PickerType>[0];

type IProps = {
  /** 日期改变的时候的值 */
  onChange?: (val?: ValueType) => void;
  /** 显示的值 */
  value?: ValueType;
  /** 日期的长度，如果不传或者传0，那就没有长度限制了 */
  dataLength?: number;
  /**
   * 屏蔽今天之后的所有日期
   * @default true
   */
  disableTodayAfter?: boolean;
} & Omit<RangePickerProps, 'value' | 'onChange'>;
const DateSelect: React.FC<IProps> = (props) => {
  const {
    value,
    onChange,
    dataLength,
    disableTodayAfter = true,
    ...resetProps
  } = props;
  const [dates, setDates] = useState({
    date: [null, null] as ValueType,
    hackDate: undefined as ValueType | undefined,
  });
  const { date, hackDate } = dates;

  const disabledDate: RangePickerProps['disabledDate'] = useMemoizedFn(
    (current) => {
      /** 今天之后是否屏蔽 */
      const isTodayAfter = moment().diff(current, 'days') < 1;
      if (disableTodayAfter && isTodayAfter) return isTodayAfter;

      /** 屏蔽时间长度 */
      if (!dataLength || !date || (!date[0] && !date[1])) {
        return false;
      }
      const tooLate = date[0] && current.diff(date[0], 'days') > dataLength;
      const tooEarly = date[1] && date[1].diff(current, 'days') > dataLength;
      return tooEarly || !!tooLate;
    },
  );

  const onOpenChange = useMemoizedFn((open: boolean) => {
    if (open) {
      setDates({ date: [null, null], hackDate: [null, null] });
    } else {
      setDates({ date, hackDate: undefined });
    }
  });

  const calendarChange = useMemoizedFn((val: ValueType) => {
    setDates({ hackDate, date: val });
  });

  return (
    /** @ts-ignore */
    <DatePicker.RangePicker
      value={hackDate || value}
      disabledDate={disabledDate}
      onCalendarChange={calendarChange}
      onChange={onChange}
      onOpenChange={onOpenChange}
      allowClear={false}
      {...resetProps}
    />
  );
};

export default DateSelect;
