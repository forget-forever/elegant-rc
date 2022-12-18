import { Select, Spin } from 'antd';
import type { CSSProperties } from 'react';
import React, { useMemo } from 'react';
import { useMount, useRequest } from 'ahooks';
import type { GetIProps, IOptions } from 'elegant-rc';
import { useDebounce } from '../../hooks';

const style: CSSProperties = {
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
  padding: '32px 0',
};

const SpinFunc = () => (
  <div style={style}>
    <Spin />
  </div>
);

const FollowMan: React.FC<
  GetIProps<typeof Select> & {
    /** 请求参数 */
    onRequest?: (val: string) => Promise<IOptions[]>;
    /**
     * 为空的时候是否要请求，默认不会发送
     * @default false
     */
    searchWidthNull?: boolean;
    /**
     * 初始化搜索
     * @default false
     */
    initSearch?: boolean;
    /**
     * 初始化搜索的时候带上value值当作搜索的参数
     * @default false
     */
    initSearchWithVal?: boolean;
    /**
     * 输入的时候触发搜索的防抖时长, 单位毫秒
     * @default 600
     */
    debounceWait?: number;
  }
> = (props) => {
  const {
    onRequest,
    searchWidthNull = false,
    initSearch = false,
    debounceWait = 600,
    value,
    initSearchWithVal,
    ...resetProps
  } = props;

  const {
    data: options,
    runAsync,
    loading,
  } = useRequest(
    async (val: string) => {
      const res = await onRequest?.(val);
      return res;
    },
    { manual: true },
  );

  const searchHandle = useDebounce((val: string) => {
    if (!val) {
      if (searchWidthNull) {
        runAsync('');
      }
    } else {
      runAsync(val);
    }
  }, debounceWait);

  useMount(() => {
    if (initSearch) {
      searchHandle(initSearchWithVal ? (value as any)?.value || value : '');
    }
  });

  const optionsCnf = useMemo(() => {
    if (!options?.length && value && typeof value === 'object') {
      /** @ts-ignore */
      const val = value.value || value;
      /** @ts-ignore */
      const label = value.label || value;
      return [{ value: val, label }];
    }
    return options;
  }, [options, value]);

  return (
    <Select
      filterOption={false}
      showSearch
      options={optionsCnf}
      onSearch={searchHandle}
      loading={loading}
      dropdownRender={loading ? SpinFunc : undefined}
      value={value}
      {...resetProps}
    />
  );
};

export default FollowMan;
