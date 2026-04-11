import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Prominent from '../index';

// jsdom 环境中需要手动初始化 window.prominentOnClickKeyValName
beforeAll(() => {
  if (!(window as any).prominentOnClickKeyValName) {
    (window as any).prominentOnClickKeyValName = jest.fn();
  }
});

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

describe('Prominent', () => {
  it('无高亮词时应原样渲染字符串', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<Prominent str="普通文字" />, container);
    });
    // 组件用 dangerouslySetInnerHTML 渲染，textContent 始终等于原始字符串
    expect(container.querySelector('span')?.textContent).toBe('普通文字');
    cleanup(container);
  });

  it('匹配关键词时应用 color 样式高亮', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <Prominent str="hello world" vals={['hello']} color="blue" />,
        container,
      );
    });
    const highlighted = container.querySelector('span[style*="color: blue"]');
    expect(highlighted).not.toBeNull();
    cleanup(container);
  });

  it('不区分大小写高亮', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <Prominent str="Hello World" vals={['hello']} color="red" />,
        container,
      );
    });
    const highlighted = container.querySelector('span[style*="color: red"]');
    expect(highlighted).not.toBeNull();
    // 原始大小写应被保留
    expect(highlighted?.textContent).toBe('Hello');
    cleanup(container);
  });

  it('多个关键词都应被高亮', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <Prominent str="foo bar baz" vals={['foo', 'baz']} color="green" />,
        container,
      );
    });
    const spans = container.querySelectorAll('span[style*="color: green"]');
    expect(spans.length).toBe(2);
    cleanup(container);
  });

  it('vals 为 null 时文字内容应完整显示', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<Prominent str="普通文字" vals={null} />, container);
    });
    // 文字内容应完整
    expect(container.querySelector('span')?.textContent).toBe('普通文字');
    cleanup(container);
  });

  it('str 为空时渲染空字符串', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<Prominent str="" vals={['test']} />, container);
    });
    expect(container.querySelector('span')?.innerHTML).toBe('');
    cleanup(container);
  });
});
