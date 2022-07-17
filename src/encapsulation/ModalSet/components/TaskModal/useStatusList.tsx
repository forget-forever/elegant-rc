import React from 'react';
import './index.css';
import { Tabs, Card, Progress } from 'antd';
import {
  progressClassNameMap,
  statusPropMap,
  textDisplayByCurrentStatus,
} from '../../enum';

const { TabPane } = Tabs;

export type IStatusListItem = {
  type: string;
  status: string;
  position: number | null;
  progress: string;
};

export default function useStatusList(statusList: IStatusListItem[]) {
  const StatusList = statusList && (
    <Tabs onChange={() => {}} type="card">
      {statusList.map((sub: IStatusListItem, i: number) => {
        const tab = `子任务${i + 1}: ${sub.type}, ${sub.status}${
          Number(sub.position) <= 0 ? '' : `,前面还有${sub.position}位排队`
        }`;
        return (
          <TabPane tab={tab} key={i}>
            <Card>
              <Progress
                percent={parseInt(sub.progress, 10) || 0}
                status={statusPropMap[sub.status]}
                className={progressClassNameMap[sub.status]}
              />
              <div style={{ marginBottom: 20 }}>
                {textDisplayByCurrentStatus[sub.status]}
              </div>
            </Card>
          </TabPane>
        );
      })}
    </Tabs>
  );

  return StatusList;
}
