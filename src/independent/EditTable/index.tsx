import type { ProTableProps } from '@ant-design/pro-table';
import { useMemoizedFn } from 'ahooks';
import type { ColProps } from 'antd';
import { Button, Form } from 'antd';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import type { MyOmit } from 'elegant-rc';
import { namePathHandle } from '../FormItemCnf/context';
import {
  uniqueKey,
  getDefaultRecordItem,
  addUniqueKey,
  deleteUniqueKey,
} from './config';
import ControlRender from './ControlRender';
import type { ColumnType, RecordItem, RecordWithId } from './type';

import { ProTable, renderColumns } from '../../encapsulation';
import { noMarginBottom } from '../../utils';

import './style.less';
import EditTableSym from './EditTableSym';

const redSignature = <span style={{ color: 'red', marginRight: 4 }}>*</span>;

const formItemCol: ColProps = {
  span: 24,
};

export type EditTableProps<DataItem extends RecordItem> = {
  columns: ColumnType<DataItem>[];
  /** 屏蔽 */
  disabled?: boolean;
  /** 数据 */
  value?: DataItem[];
  onChange?: (val?: DataItem[]) => void;
  /** 隐藏选择框 */
  hideSelect?: boolean;
  /** 新建一行的数据 */
  getRecordItem?: () => Omit<DataItem, typeof uniqueKey>;
  /**
   * 最小的数目限制
   * @default 1
   */
  minLimit?: number;
  /**
   * 限制的最大长度
   * @default 100000
   */
  maxLimit?: number;
  /**
   * 额外的添加一些选项
   * @param addDom 添加一行的dom
   * @param deleteDom 删除一行的dom
   * @param onChange 改变数据源的onChange方法，没有独一无二的key这个onChange会自动加上
   * @returns
   */
  toolBarExtraRender?: (
    addDom: React.ReactNode,
    deleteDom: React.ReactNode,
    onChange: (val: DataItem[]) => void,
    value?: DataItem[],
  ) => React.ReactNode[];
  /** form的路径 */
  basicName: (string | number)[];
  /** 切掉多余的，当最大长度限制比maxLimit大时 */
  spliceWhenMore?: boolean;
} & MyOmit<
  ProTableProps<DataItem, Record<string, string>>,
  'columns' | 'onChange'
>;

const BillInfo = <DataItem extends RecordItem>(
  props: EditTableProps<DataItem>,
) => {
  const {
    disabled,
    value,
    onChange: onChangeSource,
    columns,
    hideSelect,
    getRecordItem,
    maxLimit = 100000,
    toolBarExtraRender,
    basicName,
    minLimit = 1,
    spliceWhenMore,
    ...resetProps
  } = props;

  /** 值的快速响应 */
  const valueRes = useMemo(() => {
    /** 值没有uniqueKey的兜底操作 */
    if (value?.some((item) => !item[uniqueKey])) {
      value?.forEach((item) => {
        if (item && typeof item === 'object' && !item[uniqueKey]) {
          item[uniqueKey] = getDefaultRecordItem()[uniqueKey];
        }
      });
    }
    return value;
  }, [value]);

  /** 多选行id数组 */
  const [selectedIds, setSelectedIds] = useState<
    RecordWithId[typeof uniqueKey][]
  >([]);

  /** 通过这个onChange统一加上独一无二的id */
  const onChange = useMemoizedFn((val?: DataItem[]) => {
    onChangeSource?.(
      val?.map((item) => {
        if (!item[uniqueKey]) {
          return {
            ...getDefaultRecordItem(),
            ...item,
          };
        }
        return item;
      }),
    );
  });

  useLayoutEffect(() => {
    if (disabled) {
      return;
    }
    /** 值长度没有原始长度长的时候，加点数据到后面 */
    const oldVal = value || [];
    if (oldVal.length < minLimit) {
      const newVal = oldVal.concat(
        Array.from({ length: minLimit - oldVal.length }).map(() => ({
          ...getDefaultRecordItem(),
          ...(getRecordItem?.() as DataItem),
        })),
      );
      onChange?.(newVal);
      return;
    }
  }, [disabled, getRecordItem, minLimit, onChange, value]);

  useLayoutEffect(() => {
    if (disabled) {
      return;
    }
    /** 更大的时候就去除 */
    if (spliceWhenMore && (value?.length || 0) > maxLimit) {
      setSelectedIds([]);
      onChange?.(value?.slice(0, maxLimit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLimit, onChange, spliceWhenMore, value?.length]);

  const onDelete = useMemoizedFn(() => {
    setSelectedIds([]);
    onChange?.(
      (value || []).filter((item) => !selectedIds.includes(item[uniqueKey])),
    );
  });

  const onSelectIds = useMemoizedFn(
    (selectedRowKeys: React.Key[], selectedRows: DataItem[]) => {
      setSelectedIds(selectedRows.map((item) => item[uniqueKey]));
    },
  );

  const addHandle = useMemoizedFn(() => {
    const newList = [...(value || [])].concat([
      {
        ...getDefaultRecordItem(),
        ...(getRecordItem?.() as DataItem),
      },
    ]);
    onChange?.(newList);
  });

  const changeWithIndex = useMemoizedFn((val: DataItem, index: number) => {
    const newValue = [...(value || [])];
    newValue[index] = val;
    onChange?.(newValue);
  });

  const columnsConf = useMemo(() => {
    return renderColumns<DataItem>(
      columns.map((item) => {
        const { renderItem, required, title, ...resetItem } = item;
        const { dataIndex = '', formItemProps } = item;
        const rule = formItemProps?.rules ? [...formItemProps.rules] : [];
        if (required) {
          rule.push({ message: `${title || ''}不能为空`, required });
        }

        return {
          render(_t, record, index) {
            return (
              <Form.Item
                name={[
                  ...(basicName || []),
                  index,
                  ...namePathHandle(dataIndex as string[]),
                ]}
                style={noMarginBottom}
                wrapperCol={formItemCol}
                {...formItemProps}
                rules={rule}
              >
                <ControlRender
                  record={record}
                  item={item}
                  disabled={disabled}
                  changeRow={(val) => {
                    changeWithIndex(val, index);
                  }}
                />
              </Form.Item>
            );
          },
          title: required ? (
            <>
              {redSignature}
              {title}
            </>
          ) : (
            title
          ),
          ...resetItem,
        };
      }),
      { hideInSearch: true, hideInForm: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, basicName?.join(','), disabled]);

  const toolBar = useMemoizedFn(() => {
    const addNode = (
      <Button
        key="add"
        type="primary"
        onClick={addHandle}
        disabled={disabled || (value?.length || 0) >= maxLimit}
      >
        新增
      </Button>
    );

    const deleteNode = (
      <Button
        key="delete"
        type="primary"
        disabled={
          disabled ||
          !selectedIds.length ||
          (value?.length || 0) - selectedIds.length < minLimit
        }
        onClick={onDelete}
      >
        删除
      </Button>
    );

    return (
      toolBarExtraRender?.(
        addNode,
        deleteNode,
        onChange || (() => {}),
        value,
      ) || [addNode, deleteNode]
    );
  });
  const rowSelection = useMemo(() => {
    return !hideSelect
      ? {
          fixed: true,
          selectedRowKeys: selectedIds,
          onChange: onSelectIds,
          tableAlertRender: false,
        }
      : undefined;
  }, [hideSelect, onSelectIds, selectedIds]);

  return (
    <ProTable
      rowClassName="editable-row"
      bordered
      rowKey={uniqueKey}
      dataSource={value}
      toolBarRender={toolBar}
      search={false}
      options={false}
      columns={columnsConf}
      rowSelection={rowSelection}
      {...resetProps}
      pagination={false}
      className="elegant-rc-edit-table-container"
    />
  );
};

const EditTable: typeof BillInfo & {
  /**
   * 给数据加上uniqueKey
   * @param data 数据
   * @returns
   */
  addUniqueKey: typeof addUniqueKey;
  /**
   * 可能有的时候不想要这个uniqueKey，那就可以使用这个方法去除
   * @param data 数据
   * @returns 没有uniqueKey的数据
   */
  deleteUniqueKey: typeof deleteUniqueKey;
  /**
   * 使用symbol做到uniqueKey不可访问的EditTable
   */
  EditTableSym: typeof EditTableSym;
} = BillInfo as any;

EditTable.addUniqueKey = addUniqueKey;
EditTable.deleteUniqueKey = deleteUniqueKey;
EditTable.EditTableSym = EditTableSym;

export default EditTable;
