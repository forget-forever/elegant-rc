import { Select, Spin } from 'antd';
import type { CSSProperties } from 'react';
import React, { useMemo, forwardRef, useRef, useImperativeHandle } from 'react';
import { useMount, useRequest } from 'ahooks';
import type { GetIProps, IOptions, MyOmit } from 'elegant-rc';
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

type SearchActionType = {
  /** 立即搜索的方法 */
  load?: (
    val: string,
  ) => Promise<IOptions<string | number, React.ReactNode>[] | undefined>;
  /** 会被props（例如防抖参数）消费的搜索 */
  searchHandle?: (val: string) => void;
};

const useAction = () => {
  return useRef<SearchActionType>({});
};

const FollowMan: React.FC<
  MyOmit<GetIProps<typeof Select>, 'ref'> & {
    /** 请求参数 */
    onRequest?: (
      val: string,
    ) => Promise<IOptions<string | number, React.ReactNode>[] | undefined>;
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
    /** 需要屏蔽的一些数据，会将options的一些选项设置成disabled */
    disabledList?: (string | number)[];
    /** 实例 */
    ref?: React.ForwardedRef<SearchActionType>;
  }
> = forwardRef((props, ref) => {
  const {
    onRequest,
    searchWidthNull = false,
    initSearch = false,
    debounceWait = 600,
    value,
    initSearchWithVal,
    disabledList,
    ref: _ref,
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

  const valueCnf = useMemo(() => {
    if (props.labelInValue && value && typeof value === 'object') {
      /** @ts-ignore */
      if ([undefined, null].includes(value.value)) {
        return undefined;
      }
    }
    return value;
  }, [props.labelInValue, value]);

  const optionsCnf = useMemo(() => {
    let res = options;
    if (
      !options?.length &&
      valueCnf &&
      typeof valueCnf === 'object' &&
      !Array.isArray(valueCnf)
    ) {
      /** @ts-ignore */
      const val = valueCnf.value || valueCnf;
      /** @ts-ignore */
      const label = valueCnf.label || val;
      if (
        ![undefined, null].includes(val) &&
        ![undefined, null].includes(label)
      ) {
        res = [{ value: val, label }];
      }
    }
    return res?.map(({ value: val, ...resetItem }) => {
      return {
        value: val,
        disabled: disabledList?.includes(val),
        ...resetItem,
      };
    });
  }, [disabledList, options, valueCnf]);

  useImperativeHandle(ref, () => ({ load: runAsync, searchHandle }), [
    runAsync,
    searchHandle,
  ]);

  return (
    <Select
      filterOption={false}
      showSearch
      options={optionsCnf}
      onSearch={searchHandle}
      loading={loading}
      dropdownRender={loading ? SpinFunc : undefined}
      value={valueCnf}
      {...resetProps}
    />
  );
});

/** @ts-ignore */
const SelectSearch: typeof FollowMan & {
  useAction: typeof useAction;
} = FollowMan;
SelectSearch.useAction = useAction;

export default SelectSearch;
