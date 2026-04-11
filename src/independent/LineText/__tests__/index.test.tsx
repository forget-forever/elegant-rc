import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import LineText from '../index';

function getContainer() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

function cleanup(container: HTMLElement) {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  document.body.removeChild(container);
}

describe('LineText', () => {
  it('应渲染 children 文字', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<LineText>这是一段文字</LineText>, container);
    });
    expect(container.textContent).toContain('这是一段文字');
    cleanup(container);
  });

  it('渲染的是 span 标签', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<LineText>文字</LineText>, container);
    });
    expect(container.firstChild?.nodeName).toBe('SPAN');
    cleanup(container);
  });

  it('应有 lineHeight: 32px 的样式', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<LineText>文字</LineText>, container);
    });
    const span = container.querySelector('span') as HTMLSpanElement;
    expect(span.style.lineHeight).toBe('32px');
    cleanup(container);
  });
});
