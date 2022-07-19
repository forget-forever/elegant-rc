import React from 'react';
import { Button, Card, Modal, Progress, Steps } from 'antd';
import {
  CloseCircleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import './index.css';
import { ModalKind } from '../../../IndicatorSelect/enum';
import useCheckMoreBtn from './useCheckMoreBtn';
import useStatusList, { IStatusListItem } from './useStatusList';
import useSearchIdCopy from './useSearchIdCopy';
import {
  displayStatusList,
  EStatus,
  EStatusList,
  progressClassNameMap,
  statusPropMap,
  textDisplayByCurrentStatus,
} from '../../enum';

const { Step } = Steps;

type IProps = {
  onCancelSearchClick: () => void;
  onSubmitBackClick: () => void;
  dataSource: {
    searchId: string;
    allStatus: string;
    statusList: IStatusListItem[];
    allProgress: string;
  };
  handleExport: () => void;

  setTaskManageState: (s: Record<string, any>) => void;
  modalKind: ModalKind;
  createExportAnimation: () => void;
};

const TaskModal = (props: IProps) => {
  const {
    onCancelSearchClick,
    onSubmitBackClick,
    dataSource,
    handleExport,
    setTaskManageState,
    modalKind,
    createExportAnimation,
  } = props;

  const { allStatus } = dataSource as { allStatus: EStatus };
  const onCancel = () => {
    setTaskManageState({
      modalKind: ModalKind.NONE,
      isLoading: false,
    });
  };

  const onToBack = () => {
    createExportAnimation();
    onSubmitBackClick();
    onCancel();
  };

  const onExportClick = () => {
    createExportAnimation();
    handleExport();
    onCancel();
  };

  const searchIdCopyBtn = useSearchIdCopy(dataSource.searchId);
  const { showSubTaskList, checkMoreBtn } = useCheckMoreBtn();

  const StatusList = useStatusList(dataSource.statusList);

  return (
    <Modal
      visible={modalKind === ModalKind.QUERY}
      footer={false}
      maskClosable={false}
      closable={[EStatus.已完成, EStatus.已取消, EStatus.执行失败].includes(
        allStatus,
      )}
      onCancel={onCancel}
      zIndex={1100}
      transitionName=""
      className="myModal"
    >
      {searchIdCopyBtn}
      <Card title={false}>
        <Steps
          current={Math.min(2, EStatusList.indexOf(allStatus))}
          progressDot={(dot: string) => <>{dot}</>}
        >
          {(
            displayStatusList[allStatus] || displayStatusList[EStatus.已完成]
          ).map((l: string) => (
            <Step key={l} title={l} />
          ))}
        </Steps>
        <Progress
          percent={Math.max(parseInt(dataSource.allProgress, 10) || 5, 5)}
          status={statusPropMap[allStatus]}
          className={progressClassNameMap[allStatus]}
        />
        <div style={{ marginBottom: 20 }}>
          {textDisplayByCurrentStatus[allStatus]}
        </div>
        <div>
          {[EStatus.执行中].includes(allStatus) ? (
            <Button
              icon={<CloseCircleOutlined />}
              onClick={onCancelSearchClick}
            >
              取消查询
            </Button>
          ) : null}
          {[EStatus.执行中].includes(allStatus) ? (
            <Button
              icon={<VerticalAlignBottomOutlined />}
              onClick={onToBack}
              style={{ marginLeft: 10 }}
            >
              转后台查询
            </Button>
          ) : null}
          {[EStatus.已完成].includes(allStatus) ? (
            <Button onClick={onCancel}>查看数据</Button>
          ) : null}
          {[EStatus.已完成].includes(allStatus) ? (
            <Button onClick={onExportClick}>保存到文件服务器</Button>
          ) : null}
        </div>
      </Card>
      {checkMoreBtn}
      {showSubTaskList && StatusList}
    </Modal>
  );
};
export default TaskModal;
