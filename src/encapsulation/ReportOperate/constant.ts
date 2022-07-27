export type IDateTypeConfigBo = {
  dayOfMonth: number;
  dayOfWeek: number;
  goBackXDay: number;
  ifNatureMonth: boolean;
  ifNatureWeek: boolean;
};

export const formLayout = { labelCol: { span: 3 }, wrapperCol: { span: 6 } };
export const dateTypeOptions = [
  {
    label: '日报',
    value: 1,
  },
  {
    label: '周报',
    value: 5,
  },
  {
    label: '月报',
    value: 10,
  },
  {
    label: '月累计',
    value: 15,
  },
];

export const weekOptions = ['一', '二', '三', '四', '五', '六', '日'].map(
  (label, i) => ({
    label,
    value: i + 1,
  }),
);

export const initDateTypeConfigBo: IDateTypeConfigBo = {
  dayOfMonth: 0,
  dayOfWeek: 0,
  goBackXDay: 0,
  ifNatureMonth: false,
  ifNatureWeek: false,
};

export const mapDateTypeToConfigBo = {
  1: initDateTypeConfigBo,
  5: { ...initDateTypeConfigBo, ifNatureWeek: true },
  10: { ...initDateTypeConfigBo, ifNatureMonth: true },
  15: initDateTypeConfigBo,
};
