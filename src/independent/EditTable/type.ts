import type { FormItemProps } from 'antd';
import type { Column } from '../../encapsulation/ProTable/types';
import type { uniqueKey } from './config';

type Key = typeof uniqueKey;

export type RecordItem =
  | {
      /** 是否要屏蔽这一项 */
      disabled?: boolean;
    }
  | {};

export type RecordWithId = RecordItem & Record<Key, number | string>;

export type ColumnType<T extends RecordItem> = Column<T> & {
  /** 是否要禁止这列，会注入给renderItem返回的节点 */
  disabled?: boolean;
  formItemProps?: FormItemProps;
  fieldProps?: any;
  /**
   * 自定义的收集dom
   * 返回的JSX节点，会被注入value和onChange以及disabled属性，可以无需关注这些属性了
   */
  renderItem?: (
    text: any,
    record: T,
    onChange: (item: T) => void,
  ) => JSX.Element;
  /** 是否是必须的，如果是true的话forItem会被注入rule */
  required?: boolean;
};

export type EditTableColumns<T extends RecordItem = RecordItem> = ColumnType<T>;
