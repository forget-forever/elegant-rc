import React, { useState } from 'react';
import { Space, ConfigProvider } from 'antd';
import { OperationColumn, ReportShare } from 'elegant-rc';
import zhCN from 'antd/es/locale/zh_CN';

const list = [
  {
    reportName: '测试分享权限',
    reportTheme: '订单规模',
    id: 1,
    ifOpen: 0,
    initConfigId: 1,
    ifEditOrDel: false,
    createUserId: 'tc999999',
    reportOrPreinstall: 1,
    sourceCode: 'qqb',
    reportShareConfig: '',
  },
  {
    reportName: '测试自己创建',
    reportTheme: '订单规模',
    id: 2,
    ifOpen: 0,
    initConfigId: 2,
    ifEditOrDel: true,
    createUserId: 'tc666666',
    reportOrPreinstall: 1,
    sourceCode: 'qqb',
    reportShareConfig: 'tc016649',
  },
  {
    reportName: '测试自己创建1',
    reportTheme: '订单规模',
    id: 3,
    ifOpen: 1,
    initConfigId: 3,
    ifEditOrDel: true,
    createUserId: 'tc888888',
    reportOrPreinstall: 1,
    sourceCode: 'qqb',
    reportShareConfig: '',
  },
];

const mapSourceCodeToText = {
  qqb: '七巧板',
};

export default function () {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportItem, setReportItem] = useState({});

  const onClickShare = (record: any) => {
    setReportItem(record);
    setVisible(true);
  };

  const onConfirm = (newRecord: any) => {
    setLoading(true);
    console.log(newRecord);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1500);
  };
  const listNodes = list.map((record) => {
    const buttonPropList = [
      {
        buttonProps: {
          type: 'link' as const,
          children: record.ifEditOrDel ? '编辑' : '查看',
        },
      },
      {
        buttonProps: {
          type: 'link' as const,
          children: '分享',
          disabled: !record.ifEditOrDel,
          onClick: onClickShare,
        },
      },
      {
        buttonProps: {
          type: 'link' as const,
          children: '删除',
          disabled: !record.ifEditOrDel,
        },
        popConfirmProps: {
          title: '确认删除吗？',
          disabled: !record.ifEditOrDel,
        },
      },
    ];

    return <OperationColumn buttonPropList={buttonPropList} />;
  });

  return (
    <ConfigProvider locale={zhCN}>
      <Space direction={'vertical'}>{listNodes}</Space>
      <ReportShare
        visible={visible}
        setVisible={setVisible}
        loading={loading}
        reportItem={reportItem as any}
        onConfirm={onConfirm}
      />
    </ConfigProvider>
  );
}
