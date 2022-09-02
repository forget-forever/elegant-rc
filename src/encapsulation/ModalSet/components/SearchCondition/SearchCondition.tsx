import React, { useState } from 'react';
import { Button, Card, Divider, Input, message, Modal, Tabs } from 'antd';
import copyToClipboard from 'copy-to-clipboard';
import type {
  IMapDimNameToDetail,
  IMapIndicatorNameToDetail,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from 'src/encapsulation/IndicatorSelect';
import FeedBack from '../FeedBack';
import ParamsDesc from './ParamsDesc';
import compactParamsJson from './compactParamsJson';
import { ModalKind } from '../../../IndicatorSelect/enum';

type IProps = {
  appendBody?: boolean;
  hideCodePic?: boolean;
  top?: number;
  right?: number;
  zIndex?: number;
  modalKind: ModalKind;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  setTaskManageState: (s: Record<string, any>) => void;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
  mapDimNameToDetail: IMapDimNameToDetail;
  onCacheChange: (b: boolean) => void;
  onClickCondition: () => void;
};

const SearchCondition: React.FC<IProps> = (props) => {
  const {
    appendBody,
    hideCodePic = false,
    top,
    right,
    zIndex,
    modalKind,
    params,
    setPartialParams,
    setTaskManageState,
    mapIndicatorNameToDetail,
    mapDimNameToDetail,
    onCacheChange,
    onClickCondition,
  } = props;
  const [msg, setMsg] = useState('');
  const [copyParams, setCopyParams] = useState<TDataSourceParamsPartial>({});
  const onOkAndCancel = () => {
    setTaskManageState({
      modalKind: ModalKind.NONE,
    });
  };
  const onBlurOrChange = (text: string) => {
    try {
      setMsg('');
      if (text) {
        const copyParamsObj = JSON.parse(text);
        setCopyParams(copyParamsObj);
      }
    } catch (err) {
      setMsg('json无效');
    }
  };

  const onConfirmChange = () => {
    if (!msg) {
      // 构造参数
      setPartialParams(copyParams);
      setTaskManageState({
        modalKind: ModalKind.NONE,
      });
    } else {
      message.error(msg);
    }
  };
  return (
    <>
      <FeedBack
        appendBody={appendBody}
        hideCodePic={hideCodePic}
        top={top}
        right={right}
        zIndex={zIndex}
        params={params}
        onClickCondition={onClickCondition}
        onCacheChange={onCacheChange}
      />
      <Modal
        title="查询条件"
        centered
        visible={modalKind === ModalKind.INPUT}
        onOk={onOkAndCancel}
        onCancel={onOkAndCancel}
        width={1000}
        maskClosable={false}
        destroyOnClose
        footer={false}
        zIndex={1100}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="所选条件" key="1">
            <Input.TextArea
              readOnly
              value={JSON.stringify(params, null, 4)}
              rows={8}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}
            >
              <Button
                key="copy"
                type="primary"
                onClick={() => {
                  onOkAndCancel();
                  copyToClipboard(JSON.stringify(params, null, 4));
                  message.success('复制成功');
                }}
              >
                复制条件
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="输入条件" key="2">
            <Input.TextArea
              placeholder="粘贴条件到此处"
              onBlur={(e) => onBlurOrChange(e.target.value)}
              onChange={(e) => onBlurOrChange(e.target.value)}
              rows={4}
            />
            <div style={{ color: 'red' }}>{msg}</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}
            >
              <Button onClick={onConfirmChange}>确认</Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
        <Divider />
        <Card title="查看指标">
          <ParamsDesc
            params={params}
            mapIndicatorNameToDetail={mapIndicatorNameToDetail}
            mapDimNameToDetail={mapDimNameToDetail}
            compactParamsJson={compactParamsJson}
          />
        </Card>
      </Modal>
    </>
  );
};

export default SearchCondition;
