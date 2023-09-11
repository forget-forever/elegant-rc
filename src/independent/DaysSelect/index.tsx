import { useMemoizedFn } from 'ahooks';
import { Select } from 'antd';
import { zhCN } from 'date-fns/locale';
import { useLayoutEffect, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import type { FormProps, GetIProps, MyOmit } from 'elegant-rc';
import { timeEngine } from '../../utils';
import './style.less';

const getPopupContainer = <T,>(arg: T) => arg;

/** 日期比较的时候需要的格式 */
const compareFormat = 'YYYYMMDD';

const DaysSelect: React.FC<
  FormProps<
    string[],
    MyOmit<GetIProps<typeof Select>, 'value' | 'onChange'> & {
      /**
       * 值的格式
       * @default YYYY-MM-DD
       */
      valueFormat?: string;
      /**
       * 值显示的格式
       * @default YYYY-MM-DD
       */
      valueShowFormat?: string;
      /** 允许选择的最多的日期 */
      maxNum?: number;
      /** 允许选择的最少的日期 */
      minNim?: number;
      /** 允许选择的最大的日期 */
      minDate?: string | Date;
      /** 允许选择的最小日期 */
      maxDate?: string | Date;
      /** 值被屏蔽的时候清空 */
      clearWhenDisabled?: boolean;
    }
  >
> = (props) => {
  const {
    value,
    onChange,
    mode: _m,
    valueFormat = 'YYYY-MM-DD',
    valueShowFormat = 'YYYY-MM-DD',
    defaultValue: _d,
    disabled,
    maxNum,
    minNim,
    maxDate,
    minDate,
    clearWhenDisabled,
    ...resetProps
  } = props;

  const { valDate, valShow } = useMemo(() => {
    return {
      valDate: value?.map((ele) => {
        return timeEngine(ele, valueFormat).toDate();
      }),
      valShow: value?.map((ele) => {
        return timeEngine(ele, valueFormat).format(valueShowFormat);
      }),
    };
  }, [value, valueFormat, valueShowFormat]);

  const changeHandle = useMemoizedFn((val?: Date[] | string[]) => {
    onChange?.(
      val?.map((ele) => {
        return timeEngine(ele, valueShowFormat).format(valueFormat);
      }),
    );
  });

  const disabledHandle = useMemoizedFn((cur?: Date | string) => {
    if (!cur) {
      /** 这个是空的，返回true屏蔽吧 */
      return true;
    }
    const curNum = Number(timeEngine(cur).format(compareFormat));
    if (minDate && Number(timeEngine(minDate).format(compareFormat)) > curNum) {
      return true;
    }
    if (maxDate && Number(timeEngine(maxDate).format(compareFormat)) < curNum) {
      return true;
    }
    return false;
  });

  /**
   * 日期被屏蔽的时候清空
   */
  useLayoutEffect(() => {
    if (clearWhenDisabled && value?.length) {
      const newVal = value.filter((ele) => !disabledHandle(ele));
      /** 长度变了，说吗这个时候就是改变了 */
      if (newVal.length < value.length) {
        onChange?.(newVal);
      }
    }
  }, [clearWhenDisabled, disabledHandle, onChange, value]);

  const dropRender = useMemoizedFn(() => {
    return (
      <DayPicker
        mode="multiple"
        selected={valDate}
        locale={zhCN}
        min={minNim}
        max={maxNum}
        onSelect={changeHandle}
        disabled={disabled || disabledHandle}
      />
    );
  });

  return (
    <Select
      dropdownRender={dropRender}
      mode="multiple"
      value={valShow}
      showSearch={false}
      onChange={changeHandle}
      className="days-select-self"
      getPopupContainer={getPopupContainer}
      disabled={disabled}
      {...resetProps}
    />
  );
};

export default DaysSelect;
