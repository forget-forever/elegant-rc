/*
 * @Author: zml
 * @Date: 2022-06-16 17:01:19
 * @LastEditTime: 2022-06-16 19:50:55
 */
import type { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
};

export const headStyle: CSSProperties = {
  background: 'rgb(240, 240, 240)',
  height: 32,
  minHeight: 32,
  overflow: 'hidden',
};

export const bodyStyle: CSSProperties = {
  padding: 0,
};

export const editStyle: CSSProperties = {
  width: '100%',
  height: 'auto',
  border: '1px solid #eee',
  background: 'rgb(247, 247, 247)',
  overflowY: 'auto',
};

export const selectStyle: CSSProperties = {
  width: 'auto',
  // minWidth: "120px",
  height: 30,
  textAlign: 'end',
  position: 'absolute',
  left: 8,
  top: 0,
  zIndex: 1,
};

export const extraStyle: CSSProperties = {
  padding: '0 12px',
  position: 'absolute',
  height: 30,
  lineHeight: '30px',
  right: 0,
  color: '#999',
  top: 0,
  zIndex: 1,
  cursor: 'pointer',
};
