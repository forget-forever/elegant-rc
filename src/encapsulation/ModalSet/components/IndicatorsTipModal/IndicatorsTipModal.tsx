import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ISearchData } from '../../../IndicatorSelect';
import CommonCondition from '../SearchCondition/CommonCondition';
import getIndicatorsTipContent from './getIndicatorsTipContent';

type IProps = {
  indicatorsUnready: { value: string }[];
  setTaskManageState: (s: Record<string, any>) => void;
  searchWithIndicatorsReady: () => void;
  searchFilters: ISearchData;
};

const IndicatorsTipModal = (props: IProps) => {
  const {
    indicatorsUnready,
    setTaskManageState,
    searchWithIndicatorsReady,
    searchFilters,
  } = props;

  const indicatorsTipVisible = indicatorsUnready?.length > 0;

  const indicatorsArr = indicatorsUnready.map(({ value }) => value);
  const indicatorsTipContent = getIndicatorsTipContent({
    searchFilters,
    indicatorsArr,
  });

  const [contentVisible, setContentVisible] = useState<boolean>(false);

  const onCancel = () => {
    setTaskManageState({
      indicatorsUnready: [],
    });
  };

  const onOk = () => {
    searchWithIndicatorsReady();
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onOk}>仅查询已就绪指标</Button>
      <Button onClick={onCancel} type="primary">
        稍后再查
      </Button>
    </div>
  );

  const onCheckIndicatorsUnready = () => {
    setTimeout(() => {
      setContentVisible(!contentVisible);
    }, 0);
  };

  return (
    <Modal
      visible={indicatorsTipVisible}
      closable={false}
      zIndex={1100}
      title="提示"
      footer={footer}
    >
      <div style={{ lineHeight: 2, marginBottom: 8 }}>
        您当前查询中的部分指标未能就绪，预计还需要几分钟，建议稍后查询
      </div>
      <Button
        onClick={onCheckIndicatorsUnready}
        icon={contentVisible ? <CaretUpOutlined /> : <CaretDownOutlined />}
      >
        {contentVisible ? '收起' : '查看'}未就绪指标
      </Button>
      {contentVisible && (
        <div style={{ marginTop: 8 }}>
          {indicatorsTipContent.map(({ groupName, indicators }) => (
            <CommonCondition
              key={groupName}
              blockInfo={indicators}
              blockName={groupName}
            />
          ))}
        </div>
      )}
    </Modal>
  );
};
export default IndicatorsTipModal;
