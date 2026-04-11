import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import useDebounce from '../index';

beforeEach(() => jest.useFakeTimers('modern'));
afterEach(() => jest.useRealTimers());

/** 简单的 renderHook 辅助函数 */
function renderHook<T>(hookFn: () => T) {
  let result!: { current: T };
  const container = document.createElement('div');
  document.body.appendChild(container);

  const ResultCapture: React.FC = () => {
    result = React.useRef<T>(null as any);
    result.current = hookFn();
    return null;
  };

  act(() => {
    ReactDOM.render(React.createElement(ResultCapture), container);
  });

  const rerender = () => {
    act(() => {
      ReactDOM.render(React.createElement(ResultCapture), container);
    });
  };

  const unmount = () => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  };

  return { result, rerender, unmount };
}

describe('useDebounce', () => {
  it('应在防抖时间结束后调用函数', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, 300));

    act(() => {
      result.current('arg1' as never);
      result.current('arg2' as never);
      result.current('arg3' as never);
    });

    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('arg3');
  });

  it('默认防抖时间为 0ms', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn));

    act(() => {
      result.current();
    });

    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('防抖函数应透传参数给原始函数', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, 100));

    act(() => {
      result.current('a' as never, 'b' as never, 'c' as never);
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockFn).toHaveBeenCalledWith('a', 'b', 'c');
  });
});
