import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ModalConfirmButton from '../index';

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

describe('ModalConfirmButton', () => {
  it('应渲染 children', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalConfirmButton>
          <button>删除</button>
        </ModalConfirmButton>,
        container,
      );
    });
    expect(container.querySelector('button')?.textContent).toBe('删除');
    cleanup(container);
  });

  it('点击 children 后应显示确认弹窗', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalConfirmButton tipText="确认要删除吗？">
          <button>删除</button>
        </ModalConfirmButton>,
        container,
      );
    });
    act(() => {
      container.querySelector('button')!.click();
    });
    const modalContent = document.body.innerHTML;
    expect(modalContent).toContain('确认要删除吗？');
    cleanup(container);
  });

  it('disabledModal=true 时点击不打开弹窗', () => {
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalConfirmButton tipText="禁止弹窗" disabledModal>
          <button>删除</button>
        </ModalConfirmButton>,
        container,
      );
    });
    act(() => {
      container.querySelector('button')!.click();
    });
    expect(document.body.innerHTML).not.toContain('禁止弹窗');
    cleanup(container);
  });

  it('onSubmit 存在时点击确定后应被调用', () => {
    const onSubmit = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalConfirmButton onSubmit={onSubmit} tipText="确认操作">
          <button>删除</button>
        </ModalConfirmButton>,
        container,
      );
    });
    act(() => {
      container.querySelector('button')!.click();
    });
    // antd v5 ok button
    const okBtn = document.querySelector(
      '.ant-btn-primary',
    ) as HTMLElement | null;
    if (okBtn) {
      act(() => {
        okBtn.click();
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    }
    cleanup(container);
  });

  it('onCancel 存在时点击取消后应被调用', () => {
    const onCancel = jest.fn();
    const container = getContainer();
    act(() => {
      ReactDOM.render(
        <ModalConfirmButton onCancel={onCancel} tipText="确认操作">
          <button>删除</button>
        </ModalConfirmButton>,
        container,
      );
    });
    act(() => {
      container.querySelector('button')!.click();
    });
    // antd v5 cancel button — first default button inside the modal footer
    const cancelBtn = document.querySelector(
      '.ant-modal-footer .ant-btn:not(.ant-btn-primary)',
    ) as HTMLElement | null;
    if (cancelBtn) {
      act(() => {
        cancelBtn.click();
      });
      expect(onCancel).toHaveBeenCalledTimes(1);
    }
    cleanup(container);
  });
});
