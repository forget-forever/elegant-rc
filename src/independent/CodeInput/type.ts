import type { langes } from './config';

export type VBase = 'str' | 'obj';

export type ValueType<V extends VBase> = V extends 'str'
  ? string
  : {
      /** 选择的语言 */
      lang: typeof langes[number];
      /** 写的值 */
      str: string;
    };

export type LangesType = typeof langes[number];
