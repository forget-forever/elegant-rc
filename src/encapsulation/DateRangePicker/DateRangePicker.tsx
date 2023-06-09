import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayJs from 'dayjs';

const { RangePicker } = DatePicker;

type IProps = {
  value: dayJs.Dayjs;
  setValue: (arg?: dayJs.Dayjs[]) => void;
  range: number;
  disabled: boolean;
};
const DateRangePicker: React.FC<IProps> = (props) => {
  const { value, setValue, range, disabled } = props;
  const [dates, setDates] = useState<dayJs.Dayjs[]>([]);
  const [hackValue, setHackValue] = useState<dayJs.Dayjs[]>();

  const disabledDate: ConstructorParameters<
    typeof RangePicker
  >[0]['disabledDate'] = (current) => {
    const isTodayAfter = dayJs().diff(current, 'days') < 1;
    if (isTodayAfter) return isTodayAfter;
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > range;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > range;
    return tooEarly || tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  return (
    // @ts-ignore
    <RangePicker
      style={{ width: '250px' }}
      value={(hackValue || value) as [dayJs.Dayjs, dayJs.Dayjs]}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val as dayJs.Dayjs[])}
      onChange={(val) => setValue(val as dayJs.Dayjs[])}
      onOpenChange={onOpenChange}
      allowClear={false}
      disabled={disabled}
    />
  );
};

export default DateRangePicker;
