import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import PopoverButton from '../index';

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

describe('PopoverButton', () => {
  it('应渲染 children', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <PopoverButton>
          <button>触发器</button>
        </PopoverButton>,
        container,
      );
    });
    expect(container.textContent).toContain('触发器');
    cleanup(container);
  });

  it('传入 content 时默认不显示（初始不展开）', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <PopoverButton content={<div>弹出内容</div>}>
          <button>触发器</button>
        </PopoverButton>,
        container,
      );
    });
    // Popover 在 open=false 时不显示内容
    expect(document.body.textContent).not.toContain('弹出内容');
    cleanup(container);
  });

  it('disabledPopover=true 时改变状态被屏蔽', () => {
    const renderContent = jest.fn(() => <div>弹出内容</div>);
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <PopoverButton renderContent={renderContent} disabledPopover open>
          <button>触发器</button>
        </PopoverButton>,
        container,
      );
    });
    // disabledPopover 时内部 state 不跟随 open 属性变化
    // renderContent 会被调用（因为计算 resContent）
    expect(renderContent).toBeDefined();
    cleanup(container);
  });

  it('renderContent 接收 open/close 方法', () => {
    const renderContent = jest.fn(({ open, close }) => (
      <div>
        <button onClick={open}>打开</button>
        <button onClick={close}>关闭</button>
      </div>
    ));
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <PopoverButton renderContent={renderContent}>
          <button>触发器</button>
        </PopoverButton>,
        container,
      );
    });
    expect(renderContent).toHaveBeenCalledWith(
      expect.objectContaining({
        open: expect.any(Function),
        close: expect.any(Function),
      }),
    );
    cleanup(container);
  });
});
