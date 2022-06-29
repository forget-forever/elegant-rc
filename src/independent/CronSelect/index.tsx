/*
 * @Author: zml
 * @Date: 2022-06-14 15:14:14
 * @LastEditTime: 2022-06-29 17:29:26
 */
import { DownOutlined } from '@ant-design/icons';
import { useBoolean, useMemoizedFn } from 'ahooks';
import { Input, Popover } from 'antd';
import { uniqueId } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import type * as CronType from 'qnn-react-cron/index.d';
import QnnCron from 'qnn-react-cron';
import './styles.less';
import { TooltipPlacement } from 'antd/lib/tooltip';

const Cron = QnnCron as CronType.Cron;

type IProps = {
  /** 点击确定的时候的修改事件 */
  onChange?: (val?: string) => void;

  /**
   * Cron表达式，用来解析到UI
   */

  value?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 点击生成按钮时调用该回调
   */
  onOk?: (value: string) => void;

  /**
   * 底部按钮
   */
  footer?: boolean | React.ReactNode;

  /**
   * 配置面板的隐藏, false 即隐藏
   * Configuration panel hiding
   */
  panesShow: {
    second: boolean;
    minute: boolean;
    hour: boolean;
    day: boolean;
    month: boolean;
    week: boolean;
    year: boolean;
  };

  /**
   * 默认显示哪个面板, 默认为 second， 如果隐藏了 second 需要自行设置
   * The default is second. If second is hidden, you need to set it by yourself
   */
  defaultTab: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'week' | 'year';

  /**
   * 值为空时展示的占位文本
   * @default '请选择'
   */
  placeholder?: string;
  /**
   * 是否可以手动编辑
   * @default false
   */
  editable?: boolean;
  /**
   * 屏蔽输入
   */
  disable?: boolean;
  /** ToolTip的显示位置 */
  placement?: TooltipPlacement | undefined;
};
/**
 * cron的选择器，可以跟着FormItem一起使用
 * @param props
 * @returns
 */
const CronSelect: React.FC<Partial<IProps>> = (props) => {
  const {
    value,
    onChange,
    panesShow,
    defaultTab = 'second',
    style,
    placeholder = '请选择',
    editable = false,
    disable,
    placement,
    ...resetProps
  } = props;

  const [visible, { setFalse: close, setTrue: open, set: change }] =
    useBoolean(false);
  const fcid = useMemo(() => uniqueId('cron-fc-'), []);

  const onSubmit = useMemoizedFn((val: string) => {
    onChange?.(val);
    close();
  });
  const panesShowConfig = useMemo(
    () => ({
      second: true,
      minute: true,
      hour: true,
      day: true,
      week: true,
      month: true,
      year: true,
      ...panesShow,
    }),
    [panesShow],
  );

  const styleRes = useMemo(
    () => ({
      boxShadow: 'none',
      ...style,
    }),
    [style],
  );

  useEffect(() => {
    if (visible) {
      const dom = document.querySelector(`.${fcid} .footer button`);
      if (dom && dom?.innerHTML !== '取消') {
        dom.innerHTML = '取消';
        dom.addEventListener('click', close);
      }
    }
  }, [close, fcid, visible]);

  const changeHandle = useMemoizedFn<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    onChange?.(e.target.value);
  });

  const openHandle = useMemoizedFn(() => {
    if (!disable) {
      open();
    }
  });

  return (
    <Popover
      content={
        <Cron
          style={styleRes}
          panesShow={panesShowConfig}
          defaultTab={defaultTab}
          value={value}
          onOk={onSubmit}
          {...resetProps}
        />
      }
      overlayClassName={`${fcid}`}
      placement={placement}
      onVisibleChange={change}
      overlayInnerStyle={{ width: 600 }}
      visible={visible}
      trigger="click"
      className="cron-select"
    >
      <div className="input-container">
        <Input
          placeholder={placeholder}
          onChange={changeHandle}
          value={value}
          onClick={openHandle}
          readOnly={!editable}
        />
        <DownOutlined
          className="input-icon"
          style={{ opacity: visible ? 0.3 : 1 }}
        />
      </div>
    </Popover>
  );
};
export default CronSelect;
