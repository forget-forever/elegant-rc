import React from 'react';
import { Button, Modal } from 'antd';
import SqlEditor from '../SqlEditor';
import { ModalKind } from '../../../IndicatorSelect/enum';
import './style.css';

type IProps = {
  sqlSource: {
    sqlInfo?: string[];
    explainInfo?: string[];
  };
  onConfirm: () => void;
  modalKind: ModalKind;
};

const SqlModal: React.FC<IProps> = (props) => {
  const { sqlSource, onConfirm, modalKind } = props;

  const sqlText = sqlSource.sqlInfo?.join('\n') || '';
  const explainInfo = sqlSource.explainInfo || [];

  return (
    <Modal
      title="SQL"
      destroyOnClose
      centered
      visible={modalKind === ModalKind.SQL}
      onOk={onConfirm}
      onCancel={onConfirm}
      width={1000}
      footer={[
        <Button key="submit" type="primary" onClick={() => onConfirm()}>
          我知道了~
        </Button>,
      ]}
      zIndex={1100}
    >
      <SqlEditor lineNumbers height="350px" sqlText={sqlText} />
      {explainInfo.length > 0 && (
        <div className={'explainInfo'}>
          <h2>SQL说明</h2>
          <div>
            {explainInfo.map((e: string) => (
              <div key={e}>{e}</div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SqlModal;
