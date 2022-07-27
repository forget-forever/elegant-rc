export const reportDetail = {
  errno: 0,
  errmsg: 'SUCCESS',
  result: {
    data: {
      id: 10956,
      reportThemeCode: '',
      dateType: -1,
      dateTypeConfigBo: {
        goBackXDay: 0,
        ifNatureWeek: false,
        dayOfWeek: 0,
        ifNatureMonth: false,
        dayOfMonth: 0,
      },
      dimMeaConfig: {
        selects: [{ value: 'sum_shop_pay_price', groupBy: 'group1' }],
        group: ['business_type', 'lc_id', 'shop_real_aoi_id'],
        condition: [
          {
            key: 'business_type',
            judge: '=',
            ifShareSelect: true,
            type: 'input',
            value: [
              { value: '1', name: '1' },
              { value: '2', name: '2' },
              {
                value: '3',
                name: '3',
              },
              { value: '4', name: '4' },
            ],
          },
        ],
        extDims: null,
      },
      otherConfig: '{}',
      ifEffective: 1,
      createTime: 1640934335035,
      reportOrPreinstall: 0,
      groupByDate: null,
      aggDistribution: null,
      reportName: '贾龙测试  丰声反馈-业务全选',
      reportTheme: '订单规模',
      isRelevanceBi: 0,
      sourceCode: 'qqb',
      exeTime: '7:10',
    },
    page: 1,
    total: 1,
  },
};

export const preinstallDetail = {
  errno: 0,
  errmsg: 'SUCCESS',
  result: {
    data: {
      id: 16572,
      reportThemeCode: '',
      dateType: 1,
      dateTypeConfigBo: {
        goBackXDay: 2,
        ifNatureWeek: false,
        dayOfWeek: 0,
        ifNatureMonth: false,
        dayOfMonth: 0,
      },
      dimMeaConfig: {
        selects: [
          {
            value: 'count_all_order',
            groupBy: 'cls_fact.qqb_order_whole_v3_group',
          },
          {
            value: 'count_order',
            groupBy: 'cls_fact.qqb_order_whole_v3_group',
          },
        ],
        group: ['area'],
        condition: [
          {
            key: 'pickup_type',
            judge: '=',
            ifShareSelect: true,
            type: 'input',
            value: [{ value: '1', name: '1' }],
          },
        ],
        extDims: null,
      },
      otherConfig: '{}',
      ifEffective: 1,
      createTime: 1654573315368,
      reportOrPreinstall: 1,
      groupByDate: null,
      aggDistribution: null,
      reportName: '贾龙测试220516',
      reportTheme: '订单规模',
      isRelevanceBi: 0,
      sourceCode: 'qqb',
      exeTime: '7:10',
    },
    page: 1,
    total: 1,
  },
};
