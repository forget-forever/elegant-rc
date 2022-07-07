import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

type IProps = {
  value: moment.Moment[];
  setValue: (arg?: moment.Moment[]) => void;
  dataLength?: number;
  disabled: boolean;
};
const FilterDateSelect: React.FC<IProps> = (props) => {
  const { value, setValue, dataLength = 8, disabled } = props;
  const [dates, setDates] = useState<moment.Moment[]>([]);
  const [hackValue, setHackValue] = useState<moment.Moment[]>();

  const disabledDate: ConstructorParameters<
    typeof RangePicker
  >[0]['disabledDate'] = (current) => {
    const isTodayAfter = moment().diff(current, 'days') < 1;
    if (isTodayAfter) return isTodayAfter;
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > dataLength;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > dataLength;
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
      value={(hackValue || value) as [moment.Moment, moment.Moment]}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val as moment.Moment[])}
      onChange={(val) => setValue(val as moment.Moment[])}
      onOpenChange={onOpenChange}
      allowClear={false}
      disabled={disabled}
    />
  );
};

export default FilterDateSelect;
