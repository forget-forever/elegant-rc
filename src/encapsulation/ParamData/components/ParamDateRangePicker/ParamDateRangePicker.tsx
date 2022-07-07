import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import {
  TDataSourceParams,
  TDataSourceParamsPartial,
} from 'src/encapsulation/IndicatorSelect';
import useRangerPickerEvents from './useRangerPickerEvents';

const { RangePicker } = DatePicker;

type IProps = {
  range: 'month' | 'week' | 'day';
  diffValue: number;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
};

const ParamDateRangePicker: React.FC<IProps> = (props) => {
  const { params, setPartialParams, range, diffValue } = props;

  const {
    onOpenChange,
    onChange,
    disabledDate,
    hackValue,
    value,
    defaultValue,
    setDates,
  } = useRangerPickerEvents({ range, setPartialParams, params, diffValue });

  return (
    // @ts-ignore
    <RangePicker
      value={hackValue || value}
      defaultValue={defaultValue}
      style={{ width: '340px' }}
      disabledDate={disabledDate}
      ranges={{
        最近一周: [moment().subtract(8, 'days'), moment().subtract(1, 'days')],
        最近一月: [moment().subtract(31, 'days'), moment().subtract(1, 'days')],
      }}
      onChange={(values) => onChange(values)}
      onCalendarChange={(val: [Moment | null, Moment | null] | null) =>
        setDates(val)
      }
      onOpenChange={onOpenChange}
      inputReadOnly
    />
  );
};

export default ParamDateRangePicker;
