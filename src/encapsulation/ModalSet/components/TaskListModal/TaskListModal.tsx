import React from 'react';
import { Modal } from 'antd';
import TaskItemIndex, {
  ISourceItem,
} from './components/TaskItemIndex/TaskItemIndex';
import { ModalKind } from '../../../IndicatorSelect/enum';
import './index.css';

type IProps = {
  modalKind: ModalKind;
  setTaskManageState: (s: Record<string, any>) => void;

  backTaskList: ISourceItem[];
  onItemCancelSearchClick: (index?: undefined | number) => void;
  onItemCheckData: (index?: undefined | number) => void;
  onItemCheckProgress: (index?: undefined | number) => void;
  onItemDownloadBackDataClick: (index?: undefined | number) => void;
  onItemSaveBackDataClick: (index?: undefined | number) => void;
  updateDownloadName: (searchId: string, name: string) => void;
  searchOnRefresh: (searchId?: string) => void;
  onItemTry: (index: number) => void;
  onItemModifyCondition: (index: number) => void;
  onItemCheckSearchCondition: (index?: number) => void;
};

const TaskListModal: React.FC<IProps> = (props) => {
  const {
    modalKind,
    setTaskManageState,
    backTaskList,
    onItemCancelSearchClick,
    onItemCheckData,
    onItemCheckProgress,
    onItemDownloadBackDataClick,
    onItemSaveBackDataClick,
    onItemCheckSearchCondition,
    onItemModifyCondition,
    onItemTry,
    searchOnRefresh,
    updateDownloadName,
  } = props;

  return (
    <Modal
      width={950}
      visible={modalKind === ModalKind.LIST}
      footer={false}
      onCancel={() => {
        setTaskManageState({
          modalKind: ModalKind.NONE,
        });
      }}
      wrapClassName={'wrapTaskListModal'}
      zIndex={1100}
    >
      {(Array.isArray(backTaskList) &&
        backTaskList.length > 0 &&
        backTaskList.map((sub, i) => (
          <TaskItemIndex
            key={i}
            itemSource={sub}
            index={i}
            onItemCancelSearchClick={onItemCancelSearchClick}
            onItemCheckData={onItemCheckData}
            onItemCheckProgress={onItemCheckProgress}
            onItemDownloadBackDataClick={onItemDownloadBackDataClick}
            onItemSaveBackDataClick={onItemSaveBackDataClick}
            onItemCheckSearchCondition={onItemCheckSearchCondition}
            onItemModifyCondition={onItemModifyCondition}
            onItemTry={onItemTry}
            searchOnRefresh={searchOnRefresh}
            updateDownloadName={updateDownloadName}
          />
        ))) ||
        '暂无数据'}
    </Modal>
  );
};

export default TaskListModal;
