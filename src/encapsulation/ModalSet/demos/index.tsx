import React, { useState } from 'react';
import { ModalSet } from 'tc-rc';
import { Button, Space } from 'antd';
import { ModalKind } from '../../IndicatorSelect/enum';
import SearchCondition from '../components/SearchCondition';
import useParamsState from '../../IndicatorSelect/useParamsState';
import { isRefreshSessionKeySetter } from '../components/FeedBack/isRefreshSessionKeySetter';
import initSearchFilters from '../../IndicatorSelect/demos/initSearchFilters';
import searchFilters from '../../IndicatorSelect/demos/searchFilters.json';
import { ISearchData } from '../../IndicatorSelect';

const { mapIndicatorNameToDetail, mapDimNameToDetail } = initSearchFilters(
  searchFilters as ISearchData,
);

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
    allStatus: '执行中',
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
  const { params, setPartialParams } = useParamsState();
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
                dateList: [
                  { a: 'b', c: 'd' },
                  { a: '1', c: 2 },
                ],
                tip: '一段提示',
                isShow: true,
              },
            })
          }
        >
          活动提示
        </Button>
        {state.modalKind === ModalKind.NONE && (
          <BackListBtn
            top={270}
            right={270}
            setTaskManageState={setTaskManageState}
            currentUser={{ empName: '张三', empNum: 'tc999999' }}
            backTaskList={backTaskList}
          />
        )}
        <Button
          onClick={() => setTaskManageState({ modalKind: ModalKind.QUERY })}
        >
          任务弹窗
        </Button>
        <SearchCondition
          top={270}
          right={470}
          modalKind={state.modalKind}
          params={params}
          setPartialParams={setPartialParams}
          setTaskManageState={setTaskManageState}
          isRefreshSessionKeySetter={(s: string) =>
            isRefreshSessionKeySetter('tangram', s)
          }
          mapIndicatorNameToDetail={mapIndicatorNameToDetail}
          mapDimNameToDetail={mapDimNameToDetail}
        />
      </Space>
      <ActivityModal
        activityModalMethodName={'beforeSearch'}
        activityTips={state.activityTips}
        onActivityContinue={() =>
          setTaskManageState({
            activityTips: { dateList: [], tip: '', isShow: false },
          })
        }
        onActivityCancel={() =>
          setTaskManageState({
            activityTips: { dateList: [], tip: '', isShow: false },
          })
        }
      />
      <TaskItemModal
        modalKind={state.modalKind}
        itemSource={backTaskList[1]}
        onItemCheckData={() =>
          setTaskManageState({ modalKind: ModalKind.MEMBER })
        }
        onItemDownloadBackDataClick={() => {}}
        onItemModalCancel={() =>
          setTaskManageState({ modalKind: ModalKind.NONE })
        }
      />
      <TaskModal
        onCancelSearchClick={() => {}}
        onSubmitBackClick={() => {}}
        dataSource={backTaskList[1]}
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
        onItemCheckProgress={() =>
          setTaskManageState({ modalKind: ModalKind.MEMBER })
        }
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