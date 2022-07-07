import moment, { Moment } from 'moment';
import { useState, useEffect } from 'react';
import {
  TDataSourceParams,
  TDataSourceParamsPartial,
} from 'src/encapsulation/IndicatorSelect';
import getInitDate from './getInitDate';

type IArg = {
  range: 'month' | 'week' | 'day';
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  diffValue: number;
};

export default function useRangerPickerEvents(arg: IArg) {
  const { setPartialParams, params, range, diffValue } = arg;
  const defaultValue = getInitDate();
  const [dates, setDates] = useState<[Moment | null, Moment | null] | null>([
    null,
    null,
  ]);
  const [hackValue, setHackValue] = useState<
    [Moment | null, Moment | null] | null | undefined
  >(undefined);
  const [value, setValue] = useState<[Moment | null, Moment | null] | null>([
    null,
    null,
  ]);

  // 指标选择 - 日期条件
  const onChange = (values: [Moment | null, Moment | null] | null) => {
    const dateRangeValues = values || getInitDate();
    setValue(dateRangeValues);
    setPartialParams({
      json: {
        daterange: dateRangeValues.map((e) =>
          (e || moment().subtract(1, 'day')).format('YYYYMMDD'),
        ),
      },
    });
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(undefined);
    }
  };

  const disabledDate = (currentDate: Moment) => {
    // 只能选择昨天之前的日期
    const isTodayAfter = moment().diff(currentDate, 'days') < 1;

    // 只能选择最近6个月
    // const isBeforeStartTime = moment().diff(currentDate, 'months') > 5;
    const isBeforeStartTime = moment([2020, 0, 1]) > currentDate;

    if (!dates || dates.filter((ele) => ele).length === 0) {
      return !!(isTodayAfter || isBeforeStartTime);
    }

    // 时间跨度不能超过一个月
    const tooLate = dates[0] && currentDate.diff(dates[0], range) > diffValue;
    const tooEarly = dates[1] && dates[1].diff(currentDate, range) > diffValue;
    return !!(isTodayAfter || isBeforeStartTime || tooLate || tooEarly);
  };

  useEffect(() => {
    const newValue = params.json.daterange.map((e) => moment(e, 'YYYYMMDD'));
    setValue(newValue as [Moment, Moment]);
  }, [JSON.stringify(params.json.daterange)]);

  return {
    onChange,
    onOpenChange,
    disabledDate,
    hackValue,
    value,
    defaultValue,
    setDates,
  };
}
