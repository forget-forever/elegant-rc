import { useMemo } from 'react';
import { FormInstance } from 'antd/lib/form';
import { IFilterChecked, IMapIndicatorNameToDetail } from '../IndicatorSelect';
import { Form } from 'antd';

function treeReplace(
  data: { group: string; select: { show_name: string; name: string }[] }[],
) {
  const result = data.map(({ group, select }) => {
    const children = select.map((ele) => ({
      ...ele,
      title: ele.show_name,
      value: ele.name,
    }));
    const value = children
      .map((item) => item.value)
      .reduce((sum, ele) => `${sum}&${ele}`, '');
    return { title: group, value, children };
  });
  const value = result
    .map((item) => item.value)
    .reduce((sum, ele) => sum + ele, '');

  return [{ title: '全部指标', value, children: result }];
}

function getTreeData(
  treeSource: { title: string; value: string; children: any[] }[],
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail,
  groupValue: string[],
) {
  const res: {
    children?: any[] | undefined;
    title: string;
    value: string;
    disableCheckbox: boolean | undefined;
  }[] = [];
  treeSource.forEach((ele) => {
    const { title, value, children } = ele;
    const newChildren =
      getTreeData(children || [], mapIndicatorNameToDetail, groupValue) || [];
    const disableCheckbox =
      (newChildren || []).length > 0
        ? newChildren?.some((c) => c.disableCheckbox)
        : mapIndicatorNameToDetail.get(value)?.getDisabled(groupValue);
    const node = {
      title,
      value,
      disableCheckbox,
      ...(newChildren.length > 0 ? { children: newChildren } : {}),
    };
    res.push(node);
  });
  return res;
}

type IArg = {
  form: FormInstance<any>;
  selects: Parameters<typeof treeReplace>[0];
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  filterIndex: IFilterChecked[];
};
export function useTreeData(arg: IArg) {
  const { form, selects, mapIndicatorNameToDetail, filterIndex } = arg;
  const groupsValue = Form.useWatch('group', form);
  // const groupsValue = form.getFieldValue('groupIndex');
  const groupSet = new Set<string>(groupsValue);
  filterIndex.forEach((ele) => groupSet.add(ele.key));
  const groupValue = [...groupSet].filter(Boolean).sort();

  const treeSource = useMemo(() => {
    return treeReplace(selects);
  }, [JSON.stringify(selects)]);

  //  处理联动的：「分组和筛选」影响「指标」
  const treeData = useMemo(() => {
    return getTreeData(treeSource, mapIndicatorNameToDetail, groupValue);
  }, [JSON.stringify(groupValue), treeSource, mapIndicatorNameToDetail]);
  return treeData;
}
