import { useMemoizedFn } from 'ahooks';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';

const format = 'YYYYMMDD';

export const DatePickerExpand: React.FC<
  DatePickerProps & {
    /** 能选择的最大日期 */
    maxDate?: string;
    /** 能选择的最小日期 */
    minDate?: string;
    /** 屏蔽的日期, 可以写一天一天，也可以写时间段 */
    disabledDates?: (string | [string, string])[];
    // maxTime: string;
    // minTime: string;
  }
> = (props) => {
  const { maxDate, minDate, disabledDates, ...resetProps } = props;

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
            current > Number(moment(ele[0]).format(format)) &&
            current < Number(moment(ele[1]).format(format))
          );
        }
        return Number(moment(ele).format('YYYYMMDD')) === current;
      })
    ) {
      return true;
    }
    /** 屏蔽最大最小日期 */
    if (maxDate && minDate) {
      return (
        current > Number(moment(maxDate).format(format)) ||
        current < Number(moment(minDate).format(format))
      );
    }
    if (maxDate) {
      return current > Number(moment(maxDate).format(format));
    }
    if (minDate) {
      return current < Number(moment(minDate).format(format));
    }
    return false;
  });

  // const disabledTimeHandle = useMemoizedFn<Required<DatePickerProps>['disabledTime']>((current) => {
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // })

  /** @ts-ignore */
  return <DatePicker disabledDate={disabledDataHandle} {...resetProps} />;
};

export default DatePickerExpand;
