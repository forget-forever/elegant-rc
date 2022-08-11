import React, { useEffect, useState } from 'react';
import { Button, Input, Progress } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.css';
import {
  EStatus,
  progressClassNameMap,
  statusPropMap,
} from '../../../../../ModalSet/enum';
import type { IStatusListItem } from '../../../TaskModal/useStatusList';

export type ISourceItem = {
  name: string;
  startTime: string;
  searchId: string;
  isUnread: boolean;
  cacheStartTime: string | null;
  allStatus: string;
  statusList: IStatusListItem[];
  allProgress: string;
  url: string;
};

type IProps = {
  itemSource: ISourceItem;
  index: number;
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

const TaskItemIndex: React.FC<IProps> = (props) => {
  const {
    itemSource,
    index,
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

  const {
    name,
    startTime,
    allProgress,
    allStatus,
    searchId,
    isUnread,
    cacheStartTime,
  } = itemSource;

  const [showName, setShowName] = useState<string>(name);
  const [disabledEdit, setDisabledEdit] = useState<boolean>(true);
  const onInputBlur = () => {
    setDisabledEdit(true);
    if (showName !== name) {
      updateDownloadName(searchId!, showName);
    }
  };

  useEffect(() => {
    setShowName(name);
  }, [name]);

  return (
    <div className={'item'}>
      <div className={'textTime'}>
        {startTime && startTime.split(' ').join('\n')}
      </div>
      <div className={classnames('dot', { unread: isUnread })} />
      <div className={'itemContent'}>
        <div title="双击编辑名称" onDoubleClick={() => setDisabledEdit(false)}>
          {disabledEdit ? (
            <span className={'showName'}>{showName}</span>
          ) : (
            <Input
              autoFocus
              className={'showNameInput'}
              onBlur={onInputBlur}
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
            />
          )}
        </div>
        <Progress
          percent={parseInt(allProgress, 10)}
          status={statusPropMap[allStatus]}
          className={progressClassNameMap[allStatus]}
        />
        {cacheStartTime && (
          <div style={{ color: '#999', cursor: 'default' }}>
            <span style={{ marginRight: 8 }}>
              当前查询结果来自于{cacheStartTime?.substr(5, 11)}的缓存
            </span>
            <SyncOutlined
              title="清除缓存，重新查询"
              style={{ color: '#999' }}
              onClick={() => searchOnRefresh(searchId)}
            />
          </div>
        )}
      </div>
      <div className={'status'}>{allStatus}</div>
      <div className={'btnBox'}>
        {([EStatus.执行中] as string[]).includes(allStatus) && (
          <Button onClick={() => onItemCancelSearchClick(index)}>
            取消查询
          </Button>
        )}
        {(
          [EStatus.已完成, EStatus.保存中, EStatus.已保存] as string[]
        ).includes(allStatus) && (
          <Button onClick={() => onItemCheckData(index)}>查看数据</Button>
        )}
        {([EStatus.执行中] as string[]).includes(allStatus) && (
          <Button onClick={() => onItemCheckProgress(index)}>查看进度</Button>
        )}
        {([EStatus.已取消, EStatus.执行失败] as string[]).includes(
          allStatus,
        ) && (
          <>
            <Button onClick={() => onItemModifyCondition(index)}>
              修改条件
            </Button>
            <Button onClick={() => onItemTry(index)}>重试</Button>
          </>
        )}
        {([EStatus.已完成] as string[]).includes(allStatus) && (
          <Button onClick={() => onItemDownloadBackDataClick(index)}>
            保存到文件服务器
          </Button>
        )}
        {([EStatus.保存中] as string[]).includes(allStatus) && (
          <Button loading onClick={() => onItemSaveBackDataClick(index)}>
            下载到本地
          </Button>
        )}
        {([EStatus.已保存] as string[]).includes(allStatus) && (
          <Button onClick={() => onItemSaveBackDataClick(index)}>
            下载到本地
          </Button>
        )}
        {(
          [EStatus.已完成, EStatus.保存中, EStatus.已保存] as string[]
        ).includes(allStatus) && (
          <Button onClick={() => onItemCheckSearchCondition(index)}>
            查询条件
          </Button>
        )}
      </div>
    </div>
  );
};
export default TaskItemIndex;
