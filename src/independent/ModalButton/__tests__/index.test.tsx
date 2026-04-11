import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ModalButton from '../index';

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

describe('ModalButton', () => {
  it('应渲染 children', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalButton>
          <button>打开弹窗</button>
        </ModalButton>,
        container,
      );
    });
    expect(container.textContent).toContain('打开弹窗');
    cleanup(container);
  });

  it('点击 children 后应显示 Modal', async () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalButton title="测试弹窗">
          <button>打开弹窗</button>
        </ModalButton>,
        container,
      );
    });
    const trigger = container.querySelector('span')!;
    await act(async () => {
      trigger.click();
    });
    expect(document.body.textContent).toContain('测试弹窗');
    cleanup(container);
  });

  it('disabledModal=true 时点击不打开弹窗', async () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalButton title="测试弹窗" disabledModal>
          <button>打开弹窗</button>
        </ModalButton>,
        container,
      );
    });
    const trigger = container.querySelector('span')!;
    await act(async () => {
      trigger.click();
    });
    expect(document.querySelectorAll('.ant-modal-title').length).toBe(0);
    cleanup(container);
  });

  it('renderModalContent 接收 visible/close/open 参数', () => {
    const renderContent = jest.fn(({ visible, close, open }) => (
      <div>content</div>
    ));
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalButton renderModalContent={renderContent}>
          <button>打开弹窗</button>
        </ModalButton>,
        container,
      );
    });
    expect(renderContent).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: expect.any(Boolean),
        close: expect.any(Function),
        open: expect.any(Function),
      }),
    );
    cleanup(container);
  });
});
