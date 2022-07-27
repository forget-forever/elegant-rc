import React from 'react';
import { Button, Divider, Popconfirm } from 'antd';

const btnStyle = { padding: 0 };

type IRecordItem = {
  id: number;
  reportOrPreinstall: number;
  initConfigId: number;
  createUserId: string;
  reportName: string;
  ifEditOrDel: boolean;
  sourceCode: string;
};
type IProps = {
  mapSourceCodeToText: Record<string, string>;
  record: IRecordItem;
  onClickEditOrCheck?: (record: IRecordItem) => void;
  onClickSearch?: (record: IRecordItem) => void;
  onClickShare?: (record: IRecordItem) => void;
  onClickDelete?: (record: IRecordItem) => void;
};

const OperationColumn: React.FC<IProps> = (props) => {
  const {
    mapSourceCodeToText,
    record,
    onClickEditOrCheck,
    onClickSearch,
    onClickDelete,
    onClickShare,
  } = props;

  if (!record) {
    return null;
  }

  const { ifEditOrDel, sourceCode } = record;
  return (
    <>
      <Button
        style={btnStyle}
        onClick={() => onClickEditOrCheck?.(record)}
        type="link"
      >
        {ifEditOrDel ? '编辑' : '查看'}条件
      </Button>
      <Divider type="vertical" />
      <Button
        type="link"
        style={btnStyle}
        onClick={() => onClickSearch?.(record)}
      >
        {mapSourceCodeToText?.[sourceCode]}查询
      </Button>
      <Divider type="vertical" />
      <Button
        type="link"
        style={btnStyle}
        onClick={() => onClickShare?.(record)}
        disabled={!ifEditOrDel}
      >
        分享
      </Button>
      <Divider type="vertical" />
      <Popconfirm
        title="确认删除吗？"
        disabled={!ifEditOrDel}
        onConfirm={() => onClickDelete?.(record)}
      >
        <Button type="link" style={btnStyle} disabled={!ifEditOrDel}>
          删除
        </Button>
      </Popconfirm>
    </>
  );
};

export default OperationColumn;
