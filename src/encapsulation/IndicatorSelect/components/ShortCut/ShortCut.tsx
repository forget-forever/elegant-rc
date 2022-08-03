import React, { useState, useCallback } from 'react';
import { Affix, Button, Select } from 'antd';
import { selectShotCutContent, selectShotCutContainer } from './styles';
import type { AffixProps } from 'antd';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { TDataSourceParams, TDataSourceParamsPartial } from '../..';
import useQuerySetParam from './useQuerySetParam';
import {
  contentItem,
  contentItemLabel,
  contentItemWrapper,
} from '../../common';

const { Option, OptGroup } = Select;

export type IShortCutProps = {
  initConfigId?: string | number;
  // 吸顶距离
  offsetTop?: AffixProps['offsetTop'];
  top?: number;
  zIndex?: number;
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
      label: string;
      value: number;
    }[];
  }[];
  // 选择预设组的回调
  onChangeReport: (initConfigId: number, reportName: string) => void;
  // 重置 地址栏 query 的方法
  resetQueryOnParamChange: () => void;
};
const ShortCut: React.FC<IShortCutProps> = (props) => {
  const {
    initConfigId,
    zIndex = 1,
    offsetTop = 96,
    top,
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
        [next.value]: next.label,
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
    setReportOrPreinstallValue,
    params,
    paramsShadow,
    initConfigId,
    resetQueryOnParamChange,
  });

  const child = (
    <>
      <div
        style={{
          ...selectShotCutContainer,
          ...contentItem,
          padding: 20,
          background: '#fff',
        }}
      >
        <div style={{ ...contentItemLabel }}>快捷选择</div>
        <div style={{ ...selectShotCutContent, ...contentItemWrapper }}>
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
              onChange={(_initConfigId) => {
                const reportName = mapReportIdToName[_initConfigId];
                onChangeReport(_initConfigId, reportName);
                setReportOrPreinstallValue(_initConfigId);
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
    </>
  );

  if (top === undefined) {
    return <Affix offsetTop={offsetTop}>{child}</Affix>;
  }

  return <div style={{ zIndex, position: 'sticky', top }}>{child}</div>;
};

export default ShortCut;
