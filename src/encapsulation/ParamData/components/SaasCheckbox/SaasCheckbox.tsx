import React, { CSSProperties } from 'react';
import { Card, Checkbox, Modal, Tooltip } from 'antd';
import {
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../../../IndicatorSelect';
import { QuestionCircleOutlined } from '@ant-design/icons';

const style = {
  display: 'inline-block',
  border: '1px solid #d9d9d9',
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 32,
  paddingTop: 0,
  paddingBottom: 0,
};

type IProps = {
  blockWidth?: number;
  params: TDataSourceParams;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
};

const SaasCheckbox: React.FC<IProps> = (props) => {
  const { params, setPartialParams, blockWidth } = props;
  const { saasType = 0 } = params;

  const onChange = (flag: boolean, toggleValue: 1 | 2) => {
    const newSaasType = saasType + (flag ? 1 : -1) * toggleValue;
    if (!newSaasType) {
      Modal.warning({
        content: 'Saas业务数据必选',
        okText: '我知道了~',
      });
      return;
    }
    setPartialParams({
      saasType: newSaasType as 1 | 2 | 3,
    });
  };

  return (
    <div style={{ ...style, minWidth: blockWidth }}>
      <Card bodyStyle={bodyStyle} bordered={false}>
        <Checkbox
          checked={[1, 3].includes(saasType)}
          onChange={(e) => onChange(e.target.checked, 1)}
        >
          剔除Saas业务数据
          <Tooltip title="Saas业务属于丰配云，不属于同城业务">
            <QuestionCircleOutlined
              style={{ marginLeft: '5px', color: '#D0D0D0' }}
            />
          </Tooltip>
        </Checkbox>
        <Checkbox
          checked={[2, 3].includes(saasType)}
          onChange={(e) => onChange(e.target.checked, 2)}
        >
          Saas业务数据
        </Checkbox>
      </Card>
    </div>
  );
};

export default SaasCheckbox;
