import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import FormContextProvider from '../FormContextProvider';
import { useContextForm } from '../context';

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

describe('FormContext', () => {
  describe('FormContextProvider', () => {
    it('子组件可以通过 useContextForm 获取 disabled', () => {
      let capturedDisabled: boolean | undefined;
      const container = getContainer();

      const Consumer: React.FC = () => {
        const { disabled } = useContextForm();
        capturedDisabled = disabled;
        return null;
      };

      act(() => {
        ReactDOM.render(
          <FormContextProvider disabled={true}>
            <Consumer />
          </FormContextProvider>,
          container,
        );
      });

      expect(capturedDisabled).toBe(true);
      cleanup(container);
    });

    it('默认 disabled 为 undefined', () => {
      let capturedDisabled: boolean | undefined = true as any;
      const container = getContainer();

      const Consumer: React.FC = () => {
        const { disabled } = useContextForm();
        capturedDisabled = disabled;
        return null;
      };

      act(() => {
        ReactDOM.render(
          <FormContextProvider>
            <Consumer />
          </FormContextProvider>,
          container,
        );
      });

      expect(capturedDisabled).toBeUndefined();
      cleanup(container);
    });

    it('更新 disabled 时子组件应收到最新值', () => {
      let capturedDisabled: boolean | undefined;
      const container = getContainer();

      const Consumer: React.FC = () => {
        const { disabled } = useContextForm();
        capturedDisabled = disabled;
        return null;
      };

      act(() => {
        ReactDOM.render(
          <FormContextProvider disabled={false}>
            <Consumer />
          </FormContextProvider>,
          container,
        );
      });
      expect(capturedDisabled).toBe(false);

      act(() => {
        ReactDOM.render(
          <FormContextProvider disabled={true}>
            <Consumer />
          </FormContextProvider>,
          container,
        );
      });
      expect(capturedDisabled).toBe(true);
      cleanup(container);
    });
  });

  describe('useContextForm', () => {
    it('默认上下文中 formRef 和 disabled 均为 undefined', () => {
      let result: ReturnType<typeof useContextForm> | undefined;
      const container = getContainer();

      const Capture: React.FC = () => {
        result = useContextForm();
        return null;
      };

      act(() => {
        ReactDOM.render(<Capture />, container);
      });

      expect(result!.formRef).toBeUndefined();
      expect(result!.disabled).toBeUndefined();
      cleanup(container);
    });
  });
});
