import { Button, Badge } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ModalKind } from '../../../IndicatorSelect/enum';

type IProps = {
  top?: number;
  right?: number;
  currentUser: { empName: string; empNum: string };
  backTaskList: { isUnread: boolean }[];
  setTaskManageState: (s: Record<string, any>) => void;
};
const BackListBtn = (props: IProps) => {
  const {
    top = 8,
    right = 80,
    backTaskList,
    setTaskManageState,
    currentUser,
  } = props;
  const { empName, empNum } = currentUser;
  const onClick = () => {
    setTaskManageState({
      modalKind: ModalKind.LIST,
    });
  };

  const count = (Array.isArray(backTaskList) ? backTaskList : []).filter(
    (ele) => ele.isUnread,
  ).length;

  const text = `${empName}${empNum ? `(${empNum})` : ''}`;
  const child = (
    <Button onClick={onClick} className={'backBtn'} style={{ top, right }}>
      <Badge count={count} size="small">
        {text}
      </Badge>
    </Button>
  );
  return ReactDOM.createPortal(child, document.getElementsByTagName('body')[0]);
};
export default BackListBtn;
