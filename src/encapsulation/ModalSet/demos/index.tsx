import React, { useState } from 'react';
import { ModalSet } from 'tc-rc';
import { Button, Space } from 'antd';
import { ModalKind } from '../../IndicatorSelect/enum';

const { ActivityModal, BackListBtn, TaskItemModal, TaskModal, TaskListModal } =
  ModalSet;

const backTaskList = [
  {
    url: '',
    searchId: '0011',
    startTime: '20220716 12:39:46',
    statusList: [
      {
        status: '已完成',
        type: 'impala',
        progress: '100',
        position: null,
      },
    ],
    allStatus: '已保存',
    name: '总单量',
    allProgress: '100',
    isUnread: true,
    cacheStartTime: '2022-07-16 07:12:56',
  },
  {
    url: '',
    searchId: '0021',
    startTime: '20220717 12:39:46',
    statusList: [
      {
        status: '已完成',
        type: 'impala',
        progress: '100',
        position: null,
      },
    ],
    allStatus: '已保存',
    name: '总单量（含未支付取消单）',
    allProgress: '100',
    isUnread: false,
    cacheStartTime: '2022-07-17 07:12:56',
  },
];

export default function () {
  const [state, setState] = useState({
    modalKind: ModalKind.NONE,
    activityTips: { dateList: [], tip: '', isShow: false },
    itemSource: null,
  });
  const setTaskManageState = (p: any) => {
    setState((s) => {
      return {
        ...s,
        ...p,
      };
    });
  };
  return (
    <>
      <Space>
        <Button
          onClick={() =>
            setTaskManageState({
              activityTips: {
                ...state.activityTips,
                tip: '一段提示',
                show: true,
              },
            })
          }
        >
          活动提示
        </Button>
        <BackListBtn
          setTaskManageState={setTaskManageState}
          currentUser={{ empName: '张三', empNum: 'tc999999' }}
          backTaskList={backTaskList}
        />
        <Button>任务弹窗</Button>
      </Space>
      <ActivityModal
        activityModalMethodName={'beforeSearch'}
        activityTips={state.activityTips}
        onActivityContinue={() =>
          setTaskManageState({ ...state.activityTips, show: false })
        }
        onActivityCancel={() =>
          setTaskManageState({ ...state.activityTips, show: false })
        }
      />
      {state.itemSource && (
        <TaskItemModal
          modalKind={state.modalKind}
          itemSource={state.itemSource!}
          onItemCheckData={() =>
            setTaskManageState({ modalKind: ModalKind.MEMBER })
          }
          onItemDownloadBackDataClick={() => {}}
          onItemModalCancel={() =>
            setTaskManageState({ modalKind: ModalKind.NONE })
          }
        />
      )}
      <TaskModal
        onCancelSearchClick={() => {}}
        onSubmitBackClick={() => {}}
        dataSource={backTaskList[0]}
        handleExport={() => {}}
        createExportAnimation={() => {}}
        setTaskManageState={setTaskManageState}
        modalKind={state.modalKind}
      />
      <TaskListModal
        modalKind={state.modalKind}
        setTaskManageState={setTaskManageState}
        backTaskList={backTaskList}
        onItemCancelSearchClick={() => {}}
        onItemCheckData={() => {}}
        onItemCheckProgress={() => {}}
        onItemDownloadBackDataClick={() => {}}
        onItemSaveBackDataClick={() => {}}
        updateDownloadName={() => {}}
        searchOnRefresh={() => {}}
        onItemTry={() => {}}
        onItemModifyCondition={() => {}}
        onItemCheckSearchCondition={() => {}}
      />
    </>
  );
}
