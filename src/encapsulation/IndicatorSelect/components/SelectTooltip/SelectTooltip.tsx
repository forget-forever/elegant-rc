import React, { useMemo } from 'react';
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { Tooltip } from 'antd';
import { DeliveryType } from '../../enum';
import { IIndicatorDetail } from '../../index';

type IProps = {
  item: IIndicatorDetail;
  deliveryType: DeliveryType;
  checked: boolean;
  // eslint-disable-next-line no-undef
  generateText: (ele: { explain: string; groupby: string }) => JSX.Element;
};

const SelectTooltip: React.FC<IProps> = (props) => {
  const { deliveryType, checked, generateText, item } = props;

  const title = useMemo(() => generateText(item), [generateText, item]);
  return (
    <Tooltip
      title={title}
      mouseEnterDelay={0.3}
      color="#fff"
      overlayStyle={{ maxWidth: '500px' }}
      placement="bottom"
      autoAdjustOverflow
    >
      {[DeliveryType.OTHER, DeliveryType.ALL].includes(deliveryType) &&
      item.is_external ? (
        <ExclamationCircleOutlined
          style={{ marginLeft: '5px', color: '#D0D0D0' }}
          className={classnames('externalIcon', {
            externalIconChecked: checked,
          })}
        />
      ) : (
        <QuestionCircleOutlined
          style={{ marginLeft: '5px', color: '#D0D0D0' }}
        />
      )}
    </Tooltip>
  );
};

export default SelectTooltip;
