/*
 * @Author: zml
 * @Date: 2022-06-16 15:38:23
 * @LastEditTime: 2022-07-13 13:48:40
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/python/python';
// import 'codemirror/mode/php/php'
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/hint/show-hint.css'; // 用来做代码提示
import 'codemirror/addon/hint/show-hint.js'; // 用来做代码提示
import 'codemirror/addon/hint/sql-hint'; // 用来做代码提示
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/theme/3024-day.css';
import './styleGlobal.less';
import { Card, message, Select } from 'antd';
import {
  bodyStyle,
  containerStyle,
  editStyle,
  extraStyle,
  headStyle,
  selectStyle,
} from './styles';
import { useMemoizedFn } from 'ahooks';
import copy from 'copy-to-clipboard';
import { generateVal, getValue, languageOptions, suffixIcon } from './config';
import type { LangesType, ValueType, VBase } from './type';

type IProps<V extends VBase = 'str'> = {
  /** 默认语言，默认是javascript */
  defaultLanguage?: LangesType;
  /** 初始值，只有在初始化的时候才会加载, 初始的时候value与initValue同时存在会使用value作为初始值 */
  initValue?: string;
  /** 编辑的代码值 */
  value?: ValueType<V>;
  /**
   * 代码编辑区的高度
   * @default auto
   */
  editHeight?: string;
  /** 代码编辑区的最大高度 */
  editMaxHeight?: string;
  /** 代码编辑区的最小高度 */
  editMinHeight?: string;
  /** 代码改变的值 */
  onChange?: (val?: ValueType<V>) => void;
  /** 禁止选择语言 */
  disabledChangeLanguage?: boolean;
  /** 只读模式 */
  readonly?: boolean;
  /** 需要什么类型的值，str类型只会有字符串，obj会把选择的语言也返回来 */
  valueType?: V;
  /** 允许的语言, 如果不传，会允许全部语言 */
  codeSelect?: LangesType[];
  /** 可以手动加一些hint的数据 */
  hintMap?: Record<string, (string | number)[]>;
};
const CodeInput = <V extends VBase>(props: IProps<V>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const {
    defaultLanguage = 'javascript',
    value,
    initValue = '',
    onChange,
    disabledChangeLanguage,
    valueType = 'str' as V,
    editHeight = '300px',
    editMaxHeight,
    editMinHeight,
    readonly,
    codeSelect,
    hintMap = {},
  } = props;

  const langes = useMemo(() => {
    if (!codeSelect) return languageOptions;
    const allowLanges = [...new Set(codeSelect)];
    return languageOptions.filter((item) => allowLanges.includes(item.value));
  }, [codeSelect?.join()]);

  const [lang, setLang] = useState(() => {
    if (typeof value === 'object') {
      return value.lang || defaultLanguage || langes[0]?.value || 'javascript';
    }
    return defaultLanguage;
  });

  const changeHandle = useMemoizedFn((val?: string) =>
    onChange?.(generateVal(valueType, lang, val)),
  );

  const editorRef = useRef<ReturnType<typeof codemirror>>();

  const valData = getValue(valueType, value);

  useEffect(() => {
    if (valueType === 'obj') {
      changeHandle(valData);
    }
  }, [lang]);

  const inputRead = useMemoizedFn(
    (editor: codemirror.Editor, change: codemirror.EditorChange) => {
      const data = {
        // test: ['t_user', 'menu', 'auth_info'],
      };
      /** 一定要转化字符串，不信你试试 */
      Object.keys(hintMap).forEach((key) => {
        data[key] = hintMap[key].map(String);
      });
      editor.setOption('hintOptions', {
        tables: data,
        completeSingle: false,
      });
      editor.execCommand('autocomplete');
    },
  );

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = '';
      editorRef.current = codemirror(divRef.current, {
        indentWithTabs: true,
        readOnly: readonly,
        smartIndent: true,
        lineNumbers: true,
        autofocus: true,
        extraKeys: {
          "';'": (editor) => {
            const spaces = Array(editor.getOption('indentUnit')).join(';'); // 分号;监听执行完后,就不会再执行inputRead输入监听了
            editor.replaceSelection(spaces);
          },
        },
        hintOptions: { completeSingle: false },
        lineWrapping: true, // 在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)。
        mode: lang,
        value: valData || initValue,
      });
      editorRef.current.on('inputRead', inputRead);
      editorRef.current.on('change', () => {
        changeHandle(editorRef.current?.getValue() || '');
      });
      // editorRef.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, divRef.current, readonly]);

  useEffect(() => {
    if (valData !== (editorRef.current?.getValue() || '')) {
      editorRef.current?.setValue(valData);
    }
  }, [valData, valueType]);

  const copyHandle = useMemoizedFn(() => {
    copy(valData || editorRef.current?.getValue() || '');
    message.success('复制成功');
  });

  const styleHandle = useMemo(
    () => ({
      ...editStyle,
      height: editHeight,
      maxHeight: editMaxHeight,
      minHeight: editMinHeight,
    }),
    [editHeight, editMaxHeight, editMinHeight],
  );

  return (
    <Card
      headStyle={headStyle}
      style={containerStyle}
      bodyStyle={bodyStyle}
      title={
        <Select
          disabled={readonly || disabledChangeLanguage}
          bordered={false}
          style={selectStyle}
          options={langes}
          value={lang}
          onChange={setLang}
          suffixIcon={suffixIcon}
        />
      }
      extra={
        <span style={extraStyle} onClick={copyHandle}>
          复制代码
        </span>
      }
    >
      <div ref={divRef} style={styleHandle} />
    </Card>
  );
};

export default CodeInput;
