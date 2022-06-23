/*
 * @Author: zml
 * @Date: 2022-01-03 23:13:40
 * @LastEditTime: 2022-06-23 13:48:40
 */
import { uniqueId } from 'lodash';
import type { CSSProperties } from 'react';
import { useEffect, useMemo } from 'react';

type IProps = {
  /** 字符串 */
  str?: string;
  /** 高亮的关键字的数组，可以批量高光 */
  vals?: string[] | null;
  /** 高亮的颜色值 */
  color?: string;
  /** 关键字点击 */
  clickKeyValName?: (v: string) => void;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};
const prominentOnClickMap: Record<number, (v: string) => void> = {};
if (!window.prominentOnClickKeyValName) {
  window.prominentOnClickKeyValName = (v, id) => {
    prominentOnClickMap[id]?.(v);
  };
}
/**
 * 指定字符串高光的组件
 * @param props
 * @returns 处理后的ReactNode
 */
const Prominent: React.FC<IProps> = (props) => {
  const {
    str = '',
    vals,
    color = 'red',
    style,
    onClick,
    clickKeyValName,
  } = props;

  const compoenntId = useMemo(() => uniqueId(), []);

  useEffect(() => {
    if (clickKeyValName) {
      prominentOnClickMap[compoenntId] = clickKeyValName;
    }
    return () => {
      delete prominentOnClickMap[compoenntId];
    };
  }, [clickKeyValName, compoenntId]);

  const valClick = useMemo(
    () =>
      clickKeyValName
        ? (`onclick="prominentOnClickKeyValName('$&', ${compoenntId})"` as const)
        : '',
    [clickKeyValName, compoenntId],
  );
  const value = useMemo(() => {
    let text = str;
    try {
      const reList =
        vals?.map((ele) => `(${ele.toString().trim().toLowerCase()})`) || [];
      const re = new RegExp(reList.join('|').replace(/[\\]/g, ''), 'ig');
      if (re.test(str)) {
        text = text.replace(
          re,
          `<span ${valClick} style='color: ${color}; ${
            valClick ? 'cursor: pointer;' : ''
          }'>$&</span>`,
        );
      }
    } catch (error) {
      console.error(error);
      text = str;
    }
    return text;
  }, [color, str, valClick, vals]);

  return (
    <span
      style={style}
      onClick={clickKeyValName ? undefined : onClick}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default Prominent;
