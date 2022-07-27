import { useEffect, useState } from 'react';
import { IFilterChecked, IMapDimNameToDetail } from '../IndicatorSelect';
import { getInitFilter } from '../DimFilter/getInitFilter';
import { EDimType } from '../IndicatorSelect/enum';

type IArg = {
  mapDimNameToDetail: IMapDimNameToDetail;
  initialValues: {
    condition?: {
      key: string;
      judge: string;
      value: {
        value: string;
        name: string;
      }[];
    }[];
  };
};
export default function useDimFilterProps(arg: IArg) {
  const { mapDimNameToDetail, initialValues } = arg;
  const [filterIndex, setFilterIndex] = useState<IFilterChecked[]>([
    { ...getInitFilter() },
  ]);

  useEffect(() => {
    if (initialValues.condition) {
      const _filterIndex = initialValues.condition.map((e) => {
        return {
          key: e.key,
          judge: e.judge,
          value: e.value.map((item) => item.value),
          type: mapDimNameToDetail.get(e.key)?.type || EDimType.INPUT,
          id: Math.random(),
          showSelect: !!mapDimNameToDetail.get(e.key)?.show_select,
        };
      });
      setFilterIndex(_filterIndex);
    }
  }, [JSON.stringify(initialValues.condition || null)]);

  return {
    filterIndex,
    setFilterIndex,
  };
}
