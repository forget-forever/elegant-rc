import React from 'react';
import { Button, Card, Modal, Progress, Steps } from 'antd';
import { ModalKind } from 'src/encapsulation/IndicatorSelect/enum';
import {
  displayStatusList,
  EStatus,
  EStatusList,
  progressClassNameMap,
  statusPropMap,
  textDisplayByCurrentStatus,
} from '../../enum';
import useCheckMoreBtn from '../TaskModal/useCheckMoreBtn';
import useStatusList from '../TaskModal/useStatusList';
import useSearchIdCopy from '../TaskModal/useSearchIdCopy';
import { ISourceItem } from '../TaskListModal/components/TaskItemIndex/TaskItemIndex';
import '../TaskModal/index.css';

const { Step } = Steps;

type IProps = {
  modalKind: ModalKind;
  itemSource: ISourceItem;
  onItemCheckData: (index?: undefined | number) => void;
  onItemDownloadBackDataClick: (index?: number) => void;
  onItemModalCancel: () => void;
};

const TaskItemModal: React.FC<IProps> = (props) => {
  const {
    modalKind,
    itemSource,
    onItemCheckData,
    onItemDownloadBackDataClick,
    onItemModalCancel,
  } = props;
  const { allStatus, statusList, searchId, allProgress } = itemSource;

  const searchIdCopyBtn = useSearchIdCopy(searchId);

  const { showSubTaskList, checkMoreBtn } = useCheckMoreBtn();

  const StatusList = useStatusList(statusList);

  return (
    <Modal
      visible={modalKind === ModalKind.MEMBER}
      footer={false}
      wrapClassName={'myModal'}
      onCancel={onItemModalCancel}
      maskClosable={false}
      zIndex={1100}
    >
      {searchIdCopyBtn}
      <Card title={false}>
        <Steps
          current={Math.min(2, (EStatusList as string[]).indexOf(allStatus))}
          progressDot={(dot: string) => <>{dot}</>}
        >
          {(displayStatusList[allStatus] || displayStatusList[2]).map(
            (l: string) => (
              <Step key={l} title={l} />
            ),
          )}
        </Steps>
        <Progress
          percent={Math.max(parseInt(allProgress, 10) || 5, 5)}
          status={statusPropMap[allStatus]}
          className={progressClassNameMap[allStatus]}
        />
        <div style={{ marginBottom: 20 }}>
          {textDisplayByCurrentStatus[allStatus]}
        </div>
        <div>
          {([EStatus.已完成] as string[]).includes(allStatus) ? (
            <Button onClick={() => onItemCheckData()}>查看数据</Button>
          ) : null}
          {([EStatus.已完成] as string[]).includes(allStatus) ? (
            <Button onClick={() => onItemDownloadBackDataClick()}>下载</Button>
          ) : null}
        </div>
      </Card>
      {checkMoreBtn}
      {showSubTaskList && StatusList}
    </Modal>
  );
};

export default TaskItemModal;
