/*
 * @Author: zml
 * @Date: 2022-06-22 20:16:17
 * @LastEditTime: 2022-06-28 10:56:20
 */
import React, { useRef, useState } from 'react';
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
  /**
   * 今天是否可选
   * @default false
   */
  includeToday?: boolean;
  /**
   * 日期屏蔽的方法，在原DatePicker.RangePicker的基础上增加了disabledFn的语法糖
   */
  disabledDate?: (
    /** 当前的日期 */
    current: moment.Moment,
    /** 组件中自定义了的disabled函数, 因为传了disabledDate之后会把组件中的替换掉，如果想要继续用二次封装的，可以调用它 */
    disabledFn: (current: moment.Moment) => boolean,
  ) => boolean;
  /** 需要屏蔽的日期段, 可以直接给moment对象，也可以给YYYYMMDD数字日期, 内部做了兼容 */
  disabledRanges?: ((moment.Moment | number | undefined)[] | undefined)[];
} & Omit<RangePickerProps, 'value' | 'onChange'>;
const DateSelect: React.FC<IProps> = (props) => {
  const {
    value,
    onChange,
    dataLength,
    disableTodayAfter = true,
    includeToday,
    disabledDate: disabledSoruce,
    disabledRanges,
    ...resetProps
  } = props;

  const [dates, setDates] = useState({
    date: [null, null] as ValueType,
    hackDate: undefined as ValueType | undefined,
  });
  const { date, hackDate } = dates;

  const disabledDate = useMemoizedFn((current: moment.Moment) => {
    const toDay = moment();
    /** 今天之后是否屏蔽 */
    const isTodayAfter =
      toDay.diff(current, 'days') < 1 &&
      /** 如果今天可选，那就要判定一下当前是否等于今天 */
      (!includeToday ||
        current.format('YYYYMMDD') !== toDay.format('YYYYMMDD'));
    if (disableTodayAfter && isTodayAfter) return isTodayAfter;

    /** 屏蔽时间长度 */
    // if (!dataLength || !date || (!date[0] && !date[1])) {
    //   return false;
    // }
    if (dataLength && date && !(!date[0] && !date[1])) {
      const tooLate = date[0] && current.diff(date[0], 'days') > dataLength;
      const tooEarly = date[1] && date[1].diff(current, 'days') > dataLength;
      if (tooEarly || !!tooLate) {
        return true;
      }
    }

    const currentNum = +current.format('YYYYMMDD');
    // 是否在屏蔽段内
    if (
      disabledRanges?.some((item) => {
        if (!(item instanceof Array)) {
          return false;
        }
        /** 转化成数字时间戳 */
        const compare =
          item?.filter(Boolean).map((ele) => {
            if (typeof ele === 'number') {
              return ele;
            }
            return +ele!.format('YYYYMMDD');
          }) || [];
        if (compare.length < 2) {
          return false;
        }

        compare.sort((a, b) => a - b);

        return currentNum >= compare[0] && currentNum <= compare[1];
      }) ||
      false
    ) {
      return true;
    }

    return false;
  });

  const onOpenChange = useMemoizedFn((open: boolean) => {
    if (open) {
      setDates({ date: [null, null], hackDate: [null, null] });
    } else {
      setDates({ date, hackDate: undefined });
    }
  });

  const disabledHandle = useMemoizedFn((current: moment.Moment) => {
    return disabledSoruce?.(current, disabledDate) ?? disabledDate(current);
  });

  const calendarChange = useMemoizedFn((val: ValueType) => {
    setDates({ hackDate, date: val });
  });

  return (
    /** @ts-ignore */
    <DatePicker.RangePicker
      value={hackDate || value}
      disabledDate={disabledHandle}
      onCalendarChange={calendarChange}
      onChange={onChange}
      onOpenChange={onOpenChange}
      allowClear={false}
      {...resetProps}
    />
  );
};

export default DateSelect;
