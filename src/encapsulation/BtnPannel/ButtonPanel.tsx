import React from 'react';
import type { ButtonProps } from 'antd';
import { Affix, Button, Card, Space } from 'antd';
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
    offsetBottom = 0,
    offsetTop = 96,
    buttonPropList,
    sqlSource,
    modalKind,
    onConfirmSql,
  } = props;

  return (
    <>
      <div style={{ position: 'relative', maxWidth: '100%' }}>
        <Affix offsetBottom={offsetBottom} offsetTop={offsetTop}>
          <Card
            bodyStyle={{
              display: 'flex',
              justifyContent: 'flex-end',
              transition: 'all 0.5s',
              maxWidth: '100%',
            }}
            bordered={false}
          >
            <Space>
              {buttonPropList.map((btn) => (
                <Button key={btn.text} {...btn}>
                  {btn.text}
                </Button>
              ))}
            </Space>
          </Card>
        </Affix>
      </div>
      <SqlModal
        sqlSource={sqlSource}
        onConfirm={onConfirmSql}
        modalKind={modalKind}
      />
    </>
  );
};

export default BtnPanel;
