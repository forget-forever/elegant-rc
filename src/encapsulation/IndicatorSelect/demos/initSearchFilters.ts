import {
  IDimDetail,
  IGroup,
  IIndicatorDetail,
  IMapDimGroupCnameToIndicators,
  IMapDimNameToDetail,
  IMapGroupCnameToSelects,
  IMapIndicatorNameToDetail,
  ISearchData,
  ISelectEle,
  ISelectsItem,
  ISubjects,
} from '../index';
import { intersection } from 'lodash';

export default function initSearchFilters(data: ISearchData) {
  const searchFilters = data || {
    selects: [],
    dims: [],
    groups: [] as unknown as IGroup,
    subjects: [] as ISubjects,
  };

  const mapGroupToLabelList = {};
  for (const key in searchFilters.groups) {
    mapGroupToLabelList[key] = searchFilters.groups[key]?.map(
      (ele: { label: string }) => ele.label,
    );
  }

  // 处理快捷选择的下拉框
  const allIndicators: ISelectEle[] = [];

  (searchFilters?.selects || []).forEach((module: ISelectsItem) => {
    const data = module.select.map((ele) => {
      return { ...ele, status: false };
    });
    allIndicators.push(...data);
    return { group: module.group, select: data };
  });

  const {
    mapDimNameToDetail,
    mapIndicatorNameToDetail,
    flatIndicators,
    flatDims,
    mapGroupCnameToSelects,
    mapDimGroupCnameToIndicators,
  } = getSearchFiltersMapDetails(searchFilters);

  return {
    searchFilters,
    mapGroupToLabelList,
    mapDimNameToDetail,
    allIndicators,
    mapIndicatorNameToDetail,
    flatIndicators,
    flatDims,
    mapGroupCnameToSelects,
    mapDimGroupCnameToIndicators,
  };
}

// 辅助函数
function getSearchFiltersMapDetails(searchFilters: ISearchData) {
  const { selects, dims, groups } = searchFilters || {};

  const mapIndicatorNameToDetail: IMapIndicatorNameToDetail = new Map();
  const mapDimNameToDetail: IMapDimNameToDetail = new Map();
  const mapGroupCnameToSelects: IMapGroupCnameToSelects = new Map();
  const mapDimGroupCnameToIndicators: IMapDimGroupCnameToIndicators = new Map();

  const argValid = groups && [selects, dims].every((e) => Array.isArray(e));
  if (!argValid) {
    return {
      mapDimNameToDetail,
      mapIndicatorNameToDetail,
      mapGroupCnameToSelects,
      flatIndicators: [],
      flatDims: [],
      mapDimGroupCnameToIndicators,
    };
  }
  selects.forEach((item) => {
    const tmp = item?.select;
    const selectIndicatorDetailList: IIndicatorDetail[] = [];
    if (Array.isArray(tmp)) {
      tmp.forEach((ele) => {
        const groupsArray = groups[ele.groupby];
        if (!Array.isArray(groupsArray)) {
          console.error(ele);
        }
        const ownGroups = Array.isArray(groupsArray)
          ? groupsArray.map((e) => e.value)
          : [];
        const tmpDetail = {
          ...ele,
          ownGroups,
          getDisabled: (checkedGroups: string[]) => {
            if (!Array.isArray(checkedGroups)) {
              return false;
            }
            if (!checkedGroups.length) {
              return false;
            }
            return !checkedGroups.every((cg) => ownGroups.includes(cg));
          },
        };
        mapIndicatorNameToDetail.set(ele.name, tmpDetail);
        selectIndicatorDetailList.push(tmpDetail);
      });
    }
    mapGroupCnameToSelects.set(item.group, selectIndicatorDetailList);
  });

  dims.forEach((dim) => {
    const options = dim?.option;
    const dimDetailList: IDimDetail[] = [];
    if (Array.isArray(options)) {
      options.forEach((op) => {
        const tmpDetail = {
          ...op,
          getDisabled: (indicators: string[]) => {
            if (!Array.isArray(indicators)) {
              return false;
            }
            if (!indicators.length) {
              return false;
            }
            const dimListOfList = indicators.map((indicator) => {
              return mapIndicatorNameToDetail.get(indicator)?.ownGroups || [];
            });
            const intersectionList = intersection(...dimListOfList);
            const tmpSet = new Set<string>(intersectionList);
            return !tmpSet.has(op.name);
          },
        };
        dimDetailList.push(tmpDetail);
        mapDimNameToDetail.set(op.name, tmpDetail);
      });
    }
    mapDimGroupCnameToIndicators.set(dim.label, dimDetailList);
  });

  const flatIndicators = [...mapIndicatorNameToDetail.values()];
  const flatDims = [...mapDimNameToDetail.values()];

  return {
    mapDimNameToDetail,
    mapIndicatorNameToDetail,
    flatIndicators,
    flatDims,
    mapGroupCnameToSelects,
    mapDimGroupCnameToIndicators,
  };
}
