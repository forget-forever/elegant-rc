import IndicatorSelect from './IndicatorSelect';
import { EDimType, EQueryType } from './enum';

export default IndicatorSelect;

// 筛选条件
export type IFilterChecked = {
  key: string;
  judge: string;
  value: string[];
  showSelect: boolean;
  id: number;
  type: EDimType;
};

// where 限制条件
export type IWhereMeasures = {
  id: string | number;
  judge: '>' | '=' | '<' | '≠';
  value: number | undefined;
  key: string;
};

// 参数中 JSON 字段
export type TDataSourceJson = {
  select: Array<string>;
  groupby: Array<string>;
  where: IFilterChecked[];
  daterange: string[];
  orderMeasures: [
    {
      key: string; // 排序的指标
      orderType: 'desc' | 'asc'; // desc降序，asc升序
    },
  ];
  whereMeasures: IWhereMeasures[];
};

// 参数
export type TDataSourceParams = {
  json: TDataSourceJson;
  isdownload?: boolean; // true - 下载； false - 查询；默认 false
  current?: number; // 查询页数，默认 1
  queryType: EQueryType; // 'daily' | 'all' （按天 | 整体）
  isinfo?: boolean; // 是否是查看sql
  isasync: boolean;
  searchId?: string;
  isRefresh: boolean;
  isImpala: boolean;
  deliveryType: 1 | 2 | 3;
};

// 局部参数
export type TDataSourceParamsPartial = Partial<
  Omit<TDataSourceParams, 'json'> & {
    json: Partial<TDataSourceJson>;
  }
>;

// 主题
export type ISubjectItem = {
  title: string;
  children: string[];
};
export type ISubjects = ISubjectItem[];

// 指标
export type ISelects = ISelectsItem[];
export type ISelectsItem = {
  group: string;
  select: ISelectEle[];
};

export interface ISelectEle {
  name: string;
  show_name: string;
  group: string;
  explain: string;
  groupby: string;
  activity_type: number;
  is_external: boolean;
}

// 维度
export type IDims = {
  name: string;
  show_name: string;
  show_select: boolean;
  is_where: boolean;
  is_groupby: boolean;
  type: EDimType; // 文本：input，时间：time
};

// 分组
export type IGroup = Record<string, { label: string; value: string }[]>;

export interface ISearchData {
  selects: ISelects;
  dims: { option: IDims[]; label: string }[];
  groups: IGroup;
  subjects: ISubjects;
}

export type IDimDetail = IDims & {
  getDisabled: (indicators: string[]) => boolean;
};

export type IMapDimNameToDetail = Map<string, IDimDetail>;

export type IIndicatorDetail = ISelectsItem['select'][number] & {
  ownGroups: string[];
  getDisabled: (checkedGroups: string[]) => boolean;
};
export type IMapIndicatorNameToDetail = Map<string, IIndicatorDetail>;

export type IMapGroupCnameToSelects = Map<string, IIndicatorDetail[]>;

export type IMapDimGroupCnameToIndicators = Map<string, IDimDetail[]>;
