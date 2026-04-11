import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ButtonAsync from '../index';

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

describe('ButtonAsync', () => {
  it('应正常渲染按钮文字', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<ButtonAsync>提交</ButtonAsync>, container);
    });
    expect(container.textContent?.replace(/\s/g, '')).toContain('提交');
    cleanup(container);
  });

  it('同步 onClick 不触发 loading', () => {
    const onClick = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ButtonAsync onClick={onClick}>提交</ButtonAsync>,
        container,
      );
    });
    const btn = container.querySelector('button')!;
    act(() => {
      btn.click();
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    cleanup(container);
  });

  it('异步 onClick 期间应显示 loading 状态', async () => {
    let resolvePromise!: () => void;
    const asyncFn = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        }),
    );
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ButtonAsync onClick={asyncFn}>提交</ButtonAsync>,
        container,
      );
    });
    const btn = container.querySelector('button')!;

    act(() => {
      btn.click();
    });

    // 等待 state 更新
    await act(async () => {
      await Promise.resolve();
    });
    expect(container.querySelector('.anticon-loading')).not.toBeNull();

    await act(async () => {
      resolvePromise();
      await Promise.resolve();
    });
    expect(container.querySelector('.anticon-loading')).toBeNull();
    cleanup(container);
  });

  it('loading 状态下再次点击不应重复触发 onClick', async () => {
    let resolvePromise!: () => void;
    const asyncFn = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        }),
    );
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ButtonAsync onClick={asyncFn}>提交</ButtonAsync>,
        container,
      );
    });
    const btn = container.querySelector('button')!;

    act(() => {
      btn.click();
      btn.click();
      btn.click();
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolvePromise();
      await Promise.resolve();
    });
    cleanup(container);
  });

  it('透传 button 的其他 props', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ButtonAsync type="primary" disabled>
          提交
        </ButtonAsync>,
        container,
      );
    });
    const btn = container.querySelector('button')!;
    expect(btn.disabled).toBe(true);
    cleanup(container);
  });
});
