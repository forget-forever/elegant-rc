import { useCallback } from 'react';
import { Select } from 'antd';
import type { IMapDimNameToDetail, ISearchData } from '../../IndicatorSelect';

const { OptGroup, Option } = Select;

export default function useGroupOptionsGetter(
  dims: ISearchData['dims'],
  mapDimNameToDetail: IMapDimNameToDetail,
) {
  const groupOptionsGetter = useCallback(
    (checkedIndicators: string[]) =>
      dims.map((item) => (
        <OptGroup label={item.label} key={item.label}>
          {item.option
            .filter((ele) => ele.is_groupby)
            .map(({ name, show_name }) => (
              <Option
                value={name}
                key={name}
                disabled={mapDimNameToDetail
                  .get(name)
                  ?.getDisabled(checkedIndicators)}
              >
                {show_name}
              </Option>
            ))}
        </OptGroup>
      )),
    [dims, mapDimNameToDetail],
  );

  return groupOptionsGetter;
}
