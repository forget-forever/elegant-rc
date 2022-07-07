import { CSSProperties } from 'react';

export const contentItem: CSSProperties = {
  display: 'flex',
  padding: '20px 20px 0',
};

export const contentItemLabel: CSSProperties = {
  flex: '0 0 104px',
  color: '#000',
  fontSize: 16,
  fontFamily: 'PingFangSC-Medium',
  textAlign: 'center',
};

export const contentItemLabelText: CSSProperties = {
  height: 32,
  lineHeight: '32px',
};

export const contentItemLabelTextCollaps: CSSProperties = {
  height: 22,
  lineHeight: '22px',
};

export const contentItemWrapper: CSSProperties = {
  flex: '1 1 0',
  flexWrap: 'wrap',
};

export const contentItemCollaps: CSSProperties = {
  flex: '0 0 50px',
  alignItems: 'flex-start',
};
