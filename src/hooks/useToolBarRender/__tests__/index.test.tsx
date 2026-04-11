import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import useToolBarRender from '../index';

function renderHook<T>(hookFn: () => T) {
  let result!: { current: T };
  const container = document.createElement('div');
  document.body.appendChild(container);
  const Capture: React.FC = () => {
    result = React.useRef<T>(null as any);
    result.current = hookFn();
    return null;
  };
  act(() => {
    ReactDOM.render(React.createElement(Capture), container);
  });
  const unmount = () => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  };
  return { result, unmount };
}

describe('useToolBarRender', () => {
  it('应返回 formRef 和 toolBarRender', () => {
    const { result } = renderHook(() => useToolBarRender());

    expect(result.current).toHaveProperty('formRef');
    expect(result.current).toHaveProperty('toolBarRender');
    expect(typeof result.current.toolBarRender).toBe('function');
  });

  it('无参数时 toolBarRender 返回空数组', () => {
    const { result } = renderHook(() => useToolBarRender());

    const nodes = result.current.toolBarRender();
    expect(nodes).toEqual([]);
  });

  it('传入 ReactNode 时直接返回', () => {
    const node = <span key="1">Button</span>;
    const { result } = renderHook(() => useToolBarRender([node]));

    const nodes = result.current.toolBarRender();
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toBe(node);
  });

  it('传入函数时应透传 actionRef 调用', () => {
    const mockRender = jest.fn(() => <span>rendered</span>);
    const { result } = renderHook(() => useToolBarRender([mockRender]));

    const fakeActionRef = {} as any;
    result.current.toolBarRender(fakeActionRef);

    expect(mockRender).toHaveBeenCalledWith(
      fakeActionRef,
      result.current.formRef,
    );
  });

  it('混合 ReactNode 和函数时均正确处理', () => {
    const staticNode = <div key="static">static</div>;
    const dynamicNode = jest.fn(() => <div>dynamic</div>);
    const { result } = renderHook(() =>
      useToolBarRender([staticNode, dynamicNode]),
    );

    const nodes = result.current.toolBarRender();
    expect(nodes).toHaveLength(2);
    expect(nodes[0]).toBe(staticNode);
    expect(dynamicNode).toHaveBeenCalled();
  });
});
