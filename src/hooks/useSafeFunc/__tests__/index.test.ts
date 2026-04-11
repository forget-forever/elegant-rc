import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import useSafeFunc from '../index';

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

describe('useSafeFunc', () => {
  it('在组件挂载时应执行回调', () => {
    const { result } = renderHook(() => useSafeFunc());

    const mockCb = jest.fn();

    act(() => {
      result.current.safeRun(mockCb);
    });

    expect(mockCb).toHaveBeenCalledTimes(1);
  });

  it('在组件卸载后不应执行回调', () => {
    const { result, unmount } = renderHook(() => useSafeFunc());

    const mockCb = jest.fn();

    unmount();

    act(() => {
      result.current.safeRun(mockCb);
    });

    expect(mockCb).not.toHaveBeenCalled();
  });

  it('应返回含 safeRun 的对象', () => {
    const { result } = renderHook(() => useSafeFunc());

    expect(result.current).toHaveProperty('safeRun');
    expect(typeof result.current.safeRun).toBe('function');
  });
});
