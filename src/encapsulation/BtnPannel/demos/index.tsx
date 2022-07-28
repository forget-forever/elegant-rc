import BtnPanel from '../ButtonPanel';
import { useState } from 'react';
import type { ButtonProps } from 'antd';
import {
  CopyOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ModalKind } from '../../IndicatorSelect/enum';

const _buttonPropList: (ButtonProps & { text: string })[] = [
  {
    type: 'primary',
    text: '查询',
    onClick: () => alert('查询方法'),
    icon: <SearchOutlined />,
  },
  {
    type: 'primary',
    text: '导出',
    onClick: () => alert('导出方法'),
    icon: <DownloadOutlined />,
  },
  {
    type: 'primary',
    text: '查看SQL',
    onClick: () => alert('查询方法'),
    icon: <CopyOutlined />,
  },
  {
    type: 'dashed',
    text: '保存该查询条件',
    onClick: () => alert('保存查询条件方法'),
    icon: <PlusOutlined />,
  },
];

const sqlSource = {
  sqlInfo: ['select * from stu', 'group by age'],
  explainInfo: ['一行SQL 描述', '另一行SQL 描述'],
};

export default function () {
  const [modalKind, setModalKind] = useState(ModalKind.NONE);
  const buttonPropList = _buttonPropList.map((e) => {
    return {
      ...e,
      onClick:
        e.text === '查看SQL' ? () => setModalKind(ModalKind.SQL) : e.onClick,
    };
  });
  return (
    <BtnPanel
      buttonPropList={buttonPropList}
      sqlSource={sqlSource}
      modalKind={modalKind}
      onConfirmSql={() => setModalKind(ModalKind.NONE)}
    />
  );
}
