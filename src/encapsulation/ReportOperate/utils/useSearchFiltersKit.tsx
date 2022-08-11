import type { ISearchData } from '../../IndicatorSelect';
import { useEffect, useState } from 'react';
import initSearchFilters from './initSearchFilters';

const initSearchData = {
  dims: [],
  selects: [],
  subjects: [],
  groups: {},
};

const initData = initSearchFilters(initSearchData);

export default function useSearchFiltersKit(data: ISearchData) {
  const [searchFiltersKit, setSearchFiltersKit] =
    useState<ReturnType<typeof initSearchFilters>>(initData);

  useEffect(() => {
    const kit = initSearchFilters(data || initSearchData);
    setSearchFiltersKit(kit);
  }, [data]);

  return {
    searchFiltersKit,
  };
}
