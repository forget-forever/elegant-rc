import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import SelectControl from '../index';

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

describe('SelectControl', () => {
  it('应正常渲染', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <SelectControl
          options={[
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
          ]}
        />,
        container,
      );
    });
    // antd Select 渲染的是一个 combobox
    expect(container.querySelector('.ant-select')).not.toBeNull();
    cleanup(container);
  });

  it('传入 valueEnum（Object）时正确生成选项', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <SelectControl
          valueEnum={{ status1: '状态一', status2: '状态二' }}
          open
        />,
        container,
      );
    });
    // antd Select open 时会把 dropdown 挂到 body
    expect(document.body.textContent).toContain('状态一');
    expect(document.body.textContent).toContain('状态二');
    cleanup(container);
  });

  it('传入 valueEnum（Map）时正确生成选项', () => {
    const map = new Map([
      ['a', '选项A'],
      ['b', '选项B'],
    ]);
    const container = getContainer();
    act(() => {
      ReactDOM.render(<SelectControl valueEnum={map} open />, container);
    });
    expect(document.body.textContent).toContain('选项A');
    expect(document.body.textContent).toContain('选项B');
    cleanup(container);
  });

  it('maxCount 达到上限时其余选项应被禁用', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <SelectControl
          options={[
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
          ]}
          value={['a'] as any}
          mode="multiple"
          maxCount={1}
          open
        />,
        container,
      );
    });
    // 找到 disabled 的选项
    const disabledItems = document.querySelectorAll(
      '.ant-select-item-option-disabled',
    );
    expect(disabledItems.length).toBeGreaterThan(0);
    cleanup(container);
  });
});
