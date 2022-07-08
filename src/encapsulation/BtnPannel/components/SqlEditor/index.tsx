import React, { RefObject, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import { Input } from 'antd';

type ISqlEditor = {
  onChange?: () => void;
  border?: boolean;
  readOnly?: boolean;
  height?: string;
  lineNumbers?: boolean;
  sqlText: string;
};
const SqlEditor: React.FC<ISqlEditor> = (props) => {
  const {
    sqlText,
    onChange,
    border,
    readOnly,
    height = 'auto',
    lineNumbers,
    ...others
  } = props;
  const intervalRef: RefObject<HTMLDivElement> | null | undefined =
    React.createRef(); // useRef();
  useEffect(() => {
    const ele = intervalRef?.current?.querySelector('textarea');
    if (!ele) {
      return;
    }
    const editor = CodeMirror.fromTextArea(ele, {
      value: sqlText,
      mode: 'text/x-mysql',
      indentWithTabs: true, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
      smartIndent: true, // 自动缩进
      lineNumbers: true, // 是否在编辑器左侧显示行号
      readOnly: true,
    });
    editor.setValue(sqlText);
    editor.setSize('100%', height);
  }, []);
  return (
    <div
      ref={intervalRef}
      style={{
        border: '1px solid #d9d9d9',
        paddingLeft: '10px',
        lineHeight: '1.5',
      }}
    >
      <Input.TextArea onChange={onChange} {...others} />
    </div>
  );
};
export default SqlEditor;
