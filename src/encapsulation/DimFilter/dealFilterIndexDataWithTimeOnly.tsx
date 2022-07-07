import { IFilterChecked, IDims } from '../IndicatorSelect';

// 任何选中 type 是 time_only 类型的 维度，其它 type 是 【time， time_only】的都不可选，并且清空值

export function dealFilterIndexDataWithTimeOnly(
  filterIndex: IFilterChecked[],
  key?: string,
  filterType?: string,
) {
  const resetFlag = filterIndex.some((ele) => ['time_only'].includes(ele.type));
  let copy = filterIndex;
  if (filterType === 'time_only') {
    copy = copy.map((ele) => {
      if (ele.key === key) {
        return {
          ...ele,
        };
      }
      if (ele.type === 'time_only') {
        return {
          ...ele,
          value: [],
        };
      }
      return ele;
    });
  }
  const newFilterIndex = copy.map((ele) => {
    if (ele.type === 'time' && resetFlag) {
      return {
        ...ele,
        value: [],
      };
    }
    return ele;
  });
  return newFilterIndex;
}

export function anyTimeOnlyOnTime(filterIndex: IFilterChecked[], ele: IDims) {
  return (
    filterIndex.some((ele) => ele.type === 'time_only') && ele.type === 'time'
  );
}
