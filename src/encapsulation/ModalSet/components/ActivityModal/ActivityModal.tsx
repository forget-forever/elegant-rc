import React from 'react';
import { Modal, Button, Table } from 'antd';
import './index.css';

enum MapMethodToText {
  beforeSearch = '查询',
  onExportClick = '导出',
}

type IProps = {
  activityModalMethodName: 'beforeSearch' | 'onExportClick';
  activityTips: {
    dateList: Record<string, any>[];
    tip: string;
    isShow: boolean;
  } | null;
  onActivityContinue: () => void;
  onActivityCancel: () => void;
};
const ActivityModal = (props: IProps) => {
  const {
    activityModalMethodName,
    activityTips,
    onActivityContinue,
    onActivityCancel,
  } = props;
  const { dateList = [], tip = '', isShow } = activityTips || {};
  const columns =
    dateList[0] &&
    Object.entries(dateList[0]).map(([k, v]) => {
      return {
        title: v,
        dataIndex: k,
        key: k,
      };
    });
  const dataSource = dateList.slice(1).map((ele, i) => ({ key: i, ...ele }));

  const text = MapMethodToText[activityModalMethodName];
  return (
    <Modal
      wrapClassName="ActivityWrapper"
      visible={isShow}
      maskClosable={false}
      closable={false}
      footer={[
        <Button key="back" onClick={onActivityContinue}>
          继续{text}
        </Button>,
        <Button key="submit" type="primary" onClick={onActivityCancel}>
          放弃{text}
        </Button>,
      ]}
      zIndex={1100}
      transitionName=""
    >
      <div style={{ lineHeight: 2, marginBottom: 20, marginTop: 10 }}>
        {tip}
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Modal>
  );
};
export default ActivityModal;
