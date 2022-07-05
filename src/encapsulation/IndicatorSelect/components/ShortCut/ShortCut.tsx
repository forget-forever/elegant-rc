import React, { useState, useCallback } from 'react';
import { Button, Select, Affix } from 'antd';
import styles from './index.less';
import commonStyles from '../../common.less';
import type { AffixProps } from 'antd';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { TDataSourceParams, TDataSourceParamsPartial } from '../..';
import useQuerySetParam from './useQuerySetParam';
import classnames from 'classnames';

const { Option, OptGroup } = Select;

export type IShortCutProps = {
  // 吸顶距离
  offsetTop?: AffixProps['offsetTop'];
  // 参数
  params: TDataSourceParams;
  /** 参数分身 */
  paramsShadow: TDataSourceParams | undefined;
  // 设置参数方法
  setPartialParams: (params: TDataSourceParamsPartial) => void;
  // 全部折叠
  allCollaps: boolean;
  // 设置全部折叠
  setAllCollaps: (b: boolean) => void;
  // 分组和筛选的维度并集
  unionOfGroupFilter: string[];
  // 打平的指标数组
  flatIndicators: any[];
  // 预设组 的列表
  reportList: {
    label: string;
    list: {
      reportName: string;
      initConfigId: number;
      reportOrPreinstall: 0 | 1;
    }[];
  }[];
  // 选择预设组的回调
  onChangeReport: (initConfigId: number, reportName: string) => void;
  // 重置 地址栏 query 的方法
  resetQueryOnParamChange: () => void;
};
const ShortCut: React.FC<IShortCutProps> = (props) => {
  const {
    offsetTop = 96,
    params,
    paramsShadow,
    setPartialParams,
    allCollaps,
    setAllCollaps,
    unionOfGroupFilter,
    flatIndicators,
    reportList,
    onChangeReport,
    resetQueryOnParamChange,
  } = props;

  const { select } = params.json;

  const reportFlatList = reportList.map((e) => e.list).flat();
  const mapReportIdToName: Record<string, string> = reportFlatList.reduce(
    (pre, next) => {
      return {
        ...pre,
        [next.initConfigId]: next.reportName,
      };
    },
    {} as any,
  );

  const [reportOrPreinstallValue, setReportOrPreinstallValue] = useState<
    number | undefined
  >(undefined);

  const onClear = useCallback(() => setReportOrPreinstallValue(undefined), []);

  const flatIndicatorsOptions = flatIndicators
    ?.map((ele) => {
      return {
        disabled: ele?.getDisabled(unionOfGroupFilter),
        label: ele.show_name,
        value: ele.name,
      };
    })
    .filter((e) => !e.disabled);

  const onSelect = (value: string) => {
    const newParams = {
      json: {
        select: select.concat(value),
      },
    };
    setPartialParams(newParams);
    onClear();
  };

  useQuerySetParam({
    onChangeReport,
    setReportOrPreinstallValue,
    params,
    paramsShadow,
    initConfigId: reportOrPreinstallValue,
    resetQueryOnParamChange,
  });

  return (
    <Affix offsetTop={offsetTop}>
      <div
        className={classnames(
          commonStyles.contentItem,
          styles.selectShotCutContainer,
        )}
        style={{ padding: 20 }}
      >
        <div className={commonStyles.contentItemLabel}>快捷选择</div>
        <div
          className={classnames(
            commonStyles.contentItemWrapper,
            styles.selectShotCutContent,
          )}
        >
          <div>
            <Select<string>
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              showSearch
              style={{ width: 256 }}
              value="指标项搜索"
              onSelect={onSelect}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as any)?.includes(input?.trim() || '')
              }
              options={flatIndicatorsOptions}
            />
            <Select
              onClear={onClear}
              allowClear={!!reportOrPreinstallValue}
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              showSearch
              style={{ width: 256, marginLeft: 20 }}
              optionFilterProp="children"
              onChange={(initConfigId) => {
                const reportName = mapReportIdToName[initConfigId];
                onChangeReport(initConfigId, reportName);
                setReportOrPreinstallValue(initConfigId);
              }}
              filterOption={(input, group) => {
                if (group?.label) {
                  return false;
                }
                return !!group?.children?.includes(input as any);
              }}
              placeholder="请选择"
              value={reportOrPreinstallValue}
            >
              {reportList.map((item, index) => {
                return (
                  <OptGroup key={item.label} label={item.label}>
                    {item.list.map((ele: any) => (
                      <Option
                        key={`${item.label}${ele.label}${ele.value}`}
                        value={ele.value}
                      >
                        {ele.label}
                      </Option>
                    ))}
                  </OptGroup>
                );
              })}
            </Select>
          </div>
          <Button
            type="primary"
            icon={
              allCollaps ? (
                <VerticalAlignBottomOutlined />
              ) : (
                <VerticalAlignTopOutlined />
              )
            }
            onClick={() => setAllCollaps(!allCollaps)}
          >
            {allCollaps ? '全部展开' : '全部折叠'}
          </Button>
        </div>
      </div>
    </Affix>
  );
};

export default ShortCut;
