import React, { useMemo } from 'react';
import moment from 'moment';
import { IFilterChecked } from 'src/encapsulation/IndicatorSelect';
import { dealFilterIndexDataWithTimeOnly } from '../../dealFilterIndexDataWithTimeOnly';
import type { RangeValue } from 'rc-picker/lib/interface';
import FilterDateSelect from '../FilterDateSelect';

type IProps = {
  filterIndex: IFilterChecked[];
  setFilterIndex: (data: IFilterChecked[]) => void;
  where: IFilterChecked;
  index: number;
};
const FilterDateRange: React.FC<IProps> = (props) => {
  const { filterIndex, setFilterIndex, index, where } = props;
  const changeHandle = (val?: moment.Moment[]) => {
    const newFilterIndex = [...filterIndex];
    if (val?.[0] && val?.[1]) {
      newFilterIndex[index] = {
        ...filterIndex[index],
        value: [
          `${val?.[0]?.format('yyyyMMDD')}`,
          `${val?.[1]?.format('yyyyMMDD')}`,
        ],
      };
    } else {
      newFilterIndex[index] = { ...filterIndex[index], value: [] };
    }
    setFilterIndex(dealFilterIndexDataWithTimeOnly(newFilterIndex));
  };
  const value = useMemo(
    () => where.value.map((item) => moment(item, 'YYYYMMDD')),
    [where.value],
  );

  const disabled =
    filterIndex.some((ele) => ['time_only'].includes(ele.type)) &&
    where.type === 'time';

  return (
    <>
      <FilterDateSelect
        value={value}
        setValue={changeHandle}
        dataLength={30}
        disabled={disabled}
      />
    </>
  );
};

export default FilterDateRange;
