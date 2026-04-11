import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import useThrottle from '../index';

beforeEach(() => jest.useFakeTimers('modern'));
afterEach(() => jest.useRealTimers());

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

describe('useThrottle', () => {
  it('应在节流时间内只执行一次', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useThrottle(mockFn, 300));

    act(() => {
      result.current('first' as never);
      result.current('second' as never);
      result.current('third' as never);
    });

    // 节流：第一次调用立即执行
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('first');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // 节流时间结束后，使用最后一次调用的参数执行
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('默认节流时间为 0ms', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useThrottle(mockFn));

    act(() => {
      result.current('test' as never);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('节流函数应透传参数给原始函数', () => {
    const mockFn2 = jest.fn();
    const { result } = renderHook(() => useThrottle(mockFn2, 500));

    act(() => {
      result.current('x' as never, 'y' as never);
    });

    expect(mockFn2).toHaveBeenCalledWith('x', 'y');
  });
});
