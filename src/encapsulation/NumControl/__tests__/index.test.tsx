import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import NumControl from '../index';

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

describe('NumControl', () => {
  it('index=0 时应显示加号', () => {
    const add = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<NumControl index={0} add={add} />, container);
    });
    expect(container.querySelector('.anticon-plus-circle')).not.toBeNull();
    cleanup(container);
  });

  it('hideAdd=true 时不显示加号', () => {
    const add = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<NumControl index={0} add={add} hideAdd />, container);
    });
    expect(container.querySelector('.anticon-plus-circle')).toBeNull();
    cleanup(container);
  });

  it('index>0 时不显示加号', () => {
    const add = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<NumControl index={1} add={add} />, container);
    });
    expect(container.querySelector('.anticon-plus-circle')).toBeNull();
    cleanup(container);
  });

  it('点击加号应调用 add', () => {
    const add = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<NumControl index={0} add={add} />, container);
    });
    act(() => {
      (container.querySelector('.anticon-plus-circle') as HTMLElement).click();
    });
    expect(add).toHaveBeenCalledTimes(1);
    cleanup(container);
  });

  it('传入 remove 时应显示减号', () => {
    const add = jest.fn();
    const remove = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <NumControl index={1} add={add} remove={remove} />,
        container,
      );
    });
    expect(container.querySelector('.anticon-minus-circle')).not.toBeNull();
    cleanup(container);
  });

  it('点击减号应调用 remove 并传入 index', () => {
    const add = jest.fn();
    const remove = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <NumControl index={2} add={add} remove={remove} />,
        container,
      );
    });
    act(() => {
      (container.querySelector('.anticon-minus-circle') as HTMLElement).click();
    });
    expect(remove).toHaveBeenCalledWith(2);
    cleanup(container);
  });

  it('canRemove=false 时点击减号不触发 remove', () => {
    const add = jest.fn();
    const remove = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <NumControl index={0} add={add} remove={remove} canRemove={false} />,
        container,
      );
    });
    act(() => {
      (container.querySelector('.anticon-minus-circle') as HTMLElement).click();
    });
    expect(remove).not.toHaveBeenCalled();
    cleanup(container);
  });

  it('不传 remove 时不显示减号', () => {
    const add = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(<NumControl index={0} add={add} />, container);
    });
    expect(container.querySelector('.anticon-minus-circle')).toBeNull();
    cleanup(container);
  });
});
