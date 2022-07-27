import React from 'react';
import { Space } from 'antd';
import { OperationColumn } from 'tc-rc';

const list = [
  {
    reportName: '测试分享权限',
    reportTheme: '订单规模',
    id: 1,
    initConfigId: 1,
    ifEditOrDel: false,
    createUserId: 'tc999999',
    reportOrPreinstall: 1,
    sourceCode: 'qqb',
  },
  {
    reportName: '测试自己创建',
    reportTheme: '订单规模',
    id: 2,
    initConfigId: 2,
    ifEditOrDel: true,
    createUserId: 'tc016649',
    reportOrPreinstall: 1,
    sourceCode: 'qqb',
  },
];

const mapSourceCodeToText = {
  qqb: '七巧板',
};

export default function () {
  const listNodes = list.map((record) => (
    <OperationColumn
      key={record.id}
      record={record}
      mapSourceCodeToText={mapSourceCodeToText}
    />
  ));

  return <Space direction={'vertical'}>{listNodes}</Space>;
}
