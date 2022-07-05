import React, { useState, CSSProperties } from 'react';
import commonStyles from '../../common.less';
import classnames from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './index.less';
import {
  IMapIndicatorNameToDetail,
  TDataSourceParams,
  TDataSourceParamsPartial,
} from '../..';
import { DeliveryType } from '../../enum';

export type ISelectSumProps = {
  params: TDataSourceParams;
  allCollaps: boolean;
  generateText: (ele: { explain: string; groupby: string }) => React.ReactNode;
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  mapIndicatorNameToDetail: IMapIndicatorNameToDetail;
};

const SelectSum: React.FC<ISelectSumProps> = (props) => {
  const {
    params,
    allCollaps,
    generateText,
    setPartialParams,
    mapIndicatorNameToDetail,
  } = props;
  const {
    json: { select },
    deliveryType,
  } = params;
  const [collaps, setCollaps] = useState(false);

  const containerStyle: CSSProperties = {
    ...(select.length && allCollaps ? {} : { display: 'none' }),
    position: 'relative',
  };
  const contentStyle = collaps ? { maxHeight: 32, overflow: 'hidden' } : {};

  const onChange = (e: CheckboxChangeEvent, indicator: string) => {
    const { checked } = e.target;
    if (!checked) {
      const selectSet = new Set(select);
      selectSet.delete(indicator);
      setPartialParams({
        json: {
          select: [...selectSet],
        },
      });
    }
  };
  return (
    <>
      <div className={commonStyles.contentItem} style={containerStyle}>
        <div className={commonStyles.contentItemLabel}>
          <div className={styles.currentSelect}>已选指标</div>
        </div>
        <div
          className={classnames(commonStyles.contentItemWrapper)}
          style={contentStyle}
        >
          <div>
            {select.map((ele) => {
              const item = mapIndicatorNameToDetail.get(ele);
              return (
                item && (
                  <Checkbox
                    className={styles.sumIndex}
                    key={item.name}
                    checked
                    onChange={(e) => onChange(e, ele)}
                  >
                    {item.show_name.length > 13
                      ? `${item.show_name.slice(0, 12)}...`
                      : item.show_name}
                    <Tooltip
                      title={() => generateText(item)}
                      mouseEnterDelay={0.3}
                      color="#fff"
                      overlayStyle={{ maxWidth: '500px' }}
                    >
                      {[DeliveryType.OTHER, DeliveryType.ALL].includes(
                        deliveryType,
                      ) && item.is_external ? (
                        <ExclamationCircleOutlined
                          style={{ marginLeft: '5px', color: '#D0D0D0' }}
                          className={classnames(
                            styles.externalIcon,
                            styles.externalIconChecked,
                          )}
                        />
                      ) : (
                        <QuestionCircleOutlined
                          style={{ marginLeft: '5px', color: '#D0D0D0' }}
                        />
                      )}
                    </Tooltip>
                  </Checkbox>
                )
              );
            })}
          </div>
        </div>
        <div
          className={commonStyles.contentItemCollaps}
          onClick={() => setCollaps(!collaps)}
        >
          {collaps ? (
            <VerticalAlignBottomOutlined />
          ) : (
            <VerticalAlignTopOutlined />
          )}
          <span style={{ paddingLeft: 5 }}>{collaps ? '展开' : '折叠'}</span>
        </div>
      </div>
    </>
  );
};

export default SelectSum;
