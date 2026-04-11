import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ButtonGroup from '../index';

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

describe('ButtonGroup', () => {
  // antd v5 在汉字按钮文字间自动插入空格，用 replace 去掉空格再比对
  const btnText = (el: Element) => el.textContent?.replace(/\s/g, '') ?? '';

  it('应渲染默认取消和确定按钮', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(<ButtonGroup />, container);
    });
    const btns = container.querySelectorAll('button');
    const texts = Array.from(btns).map(btnText);
    expect(texts).toContain('取消');
    expect(texts).toContain('确定');
    cleanup(container);
  });

  it('自定义按钮文字', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ButtonGroup cancelText="关闭" submitText="保存" />,
        container,
      );
    });
    const btns = container.querySelectorAll('button');
    const texts = Array.from(btns).map(btnText);
    expect(texts).toContain('关闭');
    expect(texts).toContain('保存');
    cleanup(container);
  });

  it('点击取消按钮应触发 onCancel', () => {
    const onCancel = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<ButtonGroup onCancel={onCancel} />, container);
    });
    const cancelBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => btnText(b) === '取消',
    )!;
    act(() => {
      cancelBtn.click();
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
    cleanup(container);
  });

  it('点击确定按钮应触发 onSubmit', () => {
    const onSubmit = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<ButtonGroup onSubmit={onSubmit} />, container);
    });
    const submitBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => btnText(b) === '确定',
    )!;
    act(() => {
      submitBtn.click();
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    cleanup(container);
  });
});
