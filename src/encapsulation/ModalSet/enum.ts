export enum EStatus {
  排队中 = '排队中',
  执行中 = '执行中',
  已完成 = '已完成',
  已取消 = '已取消',
  执行失败 = '执行失败',
  保存中 = '保存中',
  已保存 = '已保存',
}

export const EStatusList = [
  EStatus.排队中,
  EStatus.执行中,
  EStatus.已完成,
  EStatus.已取消,
  EStatus.执行失败,
  EStatus.保存中,
  EStatus.已保存,
];

export const statusListComplete = ['开始查询', '查询中', '已完成'];
export const statusListCancel = ['开始查询', '查询中', '已取消'];
export const statusListFail = ['开始查询', '查询中', '执行失败'];

export const displayStatusList = {
  [EStatus.已完成]: statusListComplete,
  [EStatus.已取消]: statusListCancel,
  [EStatus.执行失败]: statusListFail,
};

export const statusPropMap = {
  [EStatus.排队中]: 'normal',
  [EStatus.执行中]: 'active',
  [EStatus.已完成]: 'success',
  [EStatus.已取消]: 'normal',
  [EStatus.执行失败]: 'exception',
};

export const progressClassNameMap = {
  [EStatus.排队中]: '',
  [EStatus.执行中]: 'running',
  [EStatus.已完成]: '',
  [EStatus.已取消]: 'cancel',
  [EStatus.执行失败]: 'fail',
};

export const textDisplayByCurrentStatus = {
  [EStatus.执行中]: '正在查询',
  [EStatus.已完成]: '查询完成',
  [EStatus.已取消]: '已取消查询',
  [EStatus.执行失败]: '查询失败，请重试',
};
