import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { Button, Checkbox, message, Modal, Card } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type {
  TDataSourceParams,
  TDataSourceParamsPartial,
} from 'src/encapsulation/IndicatorSelect';
import { DeliveryType } from '../../../IndicatorSelect/enum';

const style = {
  display: 'inline-block',
  border: '1px solid #d9d9d9',
};

type IProps = {
  blockWidth?: number;
  disabledOther?: boolean;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
};
const Delivery: React.FC<IProps> = (props) => {
  const { disabledOther = false, setPartialParams, params, blockWidth } = props;

  const { deliveryType = 1 } = params;

  const [visible, setVisible] = useState(false);

  const onChange = (checked: boolean, delivery: DeliveryType) => {
    let calcDelivery = 0;
    if (checked) {
      calcDelivery = deliveryType + delivery;
      if (delivery === DeliveryType.OTHER) {
        setVisible(true);
      }
    } else {
      calcDelivery = deliveryType - delivery;
    }
    if (calcDelivery === DeliveryType.NONE) {
      Modal.warning({
        content: '聚合配送至少选一项',
        okText: '我知道了~',
      });
      return;
    }
    setPartialParams({
      deliveryType: calcDelivery! as 1 | 2 | 3,
    });
  };

  const bodyStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: 32,
    paddingTop: 0,
    paddingBottom: 0,
  };

  return (
    <div style={{ ...style, minWidth: blockWidth }}>
      <Card bodyStyle={bodyStyle} bordered={false}>
        <Checkbox
          checked={[DeliveryType.SELF, DeliveryType.ALL].includes(deliveryType)}
          onChange={(e) => onChange(e.target.checked, DeliveryType.SELF)}
          disabled={disabledOther}
        >
          自配送
        </Checkbox>
        {!disabledOther && (
          <Checkbox
            checked={[DeliveryType.OTHER, DeliveryType.ALL].includes(
              deliveryType,
            )}
            onChange={(e) => onChange(e.target.checked, DeliveryType.OTHER)}
          >
            第三方配送(餐道单)
          </Checkbox>
        )}
      </Card>
      <Modal
        visible={visible}
        title="温馨提示"
        footer={
          <Button key="submit" type="primary" onClick={() => setVisible(false)}>
            确认
          </Button>
        }
        closable={false}
      >
        <span>
          聚合配送勾选第三方配送（餐道单）后，部分成本费用项及直接或间接使用ucode计算的指标（指标后带
          <ExclamationCircleOutlined
            style={{ margin: '0 5px', color: 'orangered' }}
          />
          标记）均不准确（原因：所有第三方配送单在系统中属于同一个骑士），请知悉，以免造成数据使用错误
        </span>
      </Modal>
    </div>
  );
};

export default Delivery;
