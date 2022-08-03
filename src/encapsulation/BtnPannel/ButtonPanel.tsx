import React, { Fragment } from 'react';
import type { ButtonProps } from 'antd';
import { Affix, Button, Space } from 'antd';
import SqlModal from './components/SqlModal/SqlModal';
import type { ModalKind } from '../IndicatorSelect/enum';

type IProps = {
  offsetBottom?: number;
  offsetTop?: number;
  buttonPropList: (ButtonProps & { text: string })[];
  sqlSource: {
    sqlInfo?: string[];
    explainInfo?: string[];
  };
  modalKind: ModalKind;
  onConfirmSql: () => void;
};

const BtnPanel: React.FC<IProps> = (props) => {
  const {
    offsetBottom,
    offsetTop,
    buttonPropList,
    sqlSource,
    modalKind,
    onConfirmSql,
  } = props;

  const Component =
    offsetBottom === undefined && offsetTop === undefined ? Fragment : Affix;

  return (
    <Component>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          transition: 'all 0.5s',
          maxWidth: '100%',
          padding: 24,
        }}
      >
        <Space>
          {buttonPropList.map((btn) => (
            <Button key={btn.text} {...btn}>
              {btn.text}
            </Button>
          ))}
        </Space>
      </div>
      <SqlModal
        sqlSource={sqlSource}
        onConfirm={onConfirmSql}
        modalKind={modalKind}
      />
    </Component>
  );
};

export default BtnPanel;
