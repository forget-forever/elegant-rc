import { useMemoizedFn } from 'ahooks';
import DatePickerAntd from 'antd/lib/date-picker';
import React, { useMemo } from 'react';
import type { FormProps, GetIProps, MyOmit, TimeType } from 'elegant-rc';
import { timeEngine } from '../../utils';

const DatePicker: React.FC<ConstructorParameters<typeof DatePickerAntd>[0]> =
  DatePickerAntd as never;

type DataTimePickProps = {
  /**
   * 日期的格式化类型
   * @default 'YYYY-MM-DD'
   */
  dateFormat?: string;
  /**
   * 时间的格式化类型
   * @default 'HH:mm''
   */
  timeFormat?: string;
  /** 可以选择最大时间 */
  minDateTime?: string;
  /** 可以选择的最小时间 */
  maxDateTime?: string;
} & MyOmit<GetIProps<typeof DatePicker>, 'value' | 'onChange'> &
  FormProps<string>;

const DateTimePicker: React.FC<DataTimePickProps> = (props) => {
  const { maxDateTime, minDateTime, dateFormat, timeFormat, value, onChange } =
    props;

  const valueFormat = `${dateFormat} ${timeFormat}`;

  const changeHandle = useMemoizedFn((val?: TimeType | null) => {
    if (!val) {
      onChange?.(undefined);
      return;
    }
    onChange?.(timeEngine(val).format(valueFormat));
  });

  const valueHandled = useMemo(() => {
    if (!value) return undefined;
    return timeEngine(value, valueFormat);
  }, [value, valueFormat]);

  return (
    <DatePicker
      showTime={{
        hideDisabledOptions: true,
        minuteStep: 30,
        showSecond: false,
      }}
      disabledTime={() => {
        return {};
      }}
      onChange={changeHandle}
      value={valueHandled}
    />
  );
};

export default DateTimePicker;
