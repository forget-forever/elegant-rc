import { Button, Checkbox, Dropdown, Image, Menu, Tooltip, Affix } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../../IndicatorSelect';
import { ModalKind } from '../../../IndicatorSelect/enum';

type IProps = {
  top?: number;
  right?: number;
  zIndex?: number;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  setTaskManageState: (s: Record<string, any>) => void;
  isRefreshSessionKeySetter: (v: string) => void;
};
const FeedBack = (props: IProps) => {
  const {
    top = 56,
    right = 60,
    zIndex,
    params,
    setPartialParams,
    setTaskManageState,
    isRefreshSessionKeySetter,
  } = props;

  const { isRefresh } = params;

  const onClickConditon = () => {
    setTaskManageState({
      modalKind: ModalKind.INPUT,
    });
  };

  const menu = (
    <Menu style={{ zIndex: 99999 }}>
      <Menu.Item>
        <Checkbox
          style={{ marginLeft: 10 }}
          checked={isRefresh}
          onChange={(e) => {
            const val = e.target.checked;
            isRefreshSessionKeySetter(val ? '1' : '');
            setPartialParams({
              isRefresh: val,
            });
          }}
        >
          强制清除缓存
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={onClickConditon}>查询条件</Button>
      </Menu.Item>
      <Menu.Item>
        <Tooltip
          title="若二维码失效，联系 tc014953、tc001713"
          placement="bottom"
          overlayStyle={{ zIndex: 999999 }}
        >
          <Image
            style={{
              padding: '2em',
            }}
            src="http://codepush-1258916733.cos.ap-shanghai.myqcloud.com/fe-image/data/data-family.png"
          />
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  const node = (
    <Dropdown
      placement="bottomLeft"
      className={'feedBack'}
      overlay={menu}
      // @ts-ignore
      getPopupContainer={(triggerNode) => {
        return triggerNode.parentNode || document.body;
      }}
    >
      <span
        style={{
          top,
          right,
          position: 'fixed',
          zIndex,
        }}
      >
        问题反馈
      </span>
    </Dropdown>
  );

  return ReactDOM.createPortal(node, document.getElementsByTagName('body')[0]);
};
export default FeedBack;
