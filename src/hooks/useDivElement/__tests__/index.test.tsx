import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import useDivElement from '../index';

function getContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

describe('useDivElement', () => {
  it('应返回 Node 和 ref', () => {
    let hookResult: ReturnType<typeof useDivElement> | undefined;
    const container = getContainer();

    const Comp: React.FC = () => {
      hookResult = useDivElement();
      return <>{hookResult.Node}</>;
    };

    act(() => {
      ReactDOM.render(<Comp />, container);
    });

    expect(hookResult).toHaveProperty('Node');
    expect(hookResult).toHaveProperty('ref');

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });

  it('渲染 div 节点后，ref 应指向 DOM 元素', () => {
    let hookResult: ReturnType<typeof useDivElement> | undefined;
    const container = getContainer();

    const Comp: React.FC = () => {
      hookResult = useDivElement({ 'data-testid': 'test-div' } as any);
      return <>{hookResult.Node}</>;
    };

    act(() => {
      ReactDOM.render(<Comp />, container);
    });

    expect(hookResult!.ref.current).toBeInstanceOf(HTMLDivElement);
    expect(container.querySelector('[data-testid="test-div"]')).not.toBeNull();

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });

  it('afterMount 回调应在挂载后被调用', () => {
    const afterMount = jest.fn();
    const container = getContainer();

    const Comp: React.FC = () => {
      const { Node } = useDivElement({ afterMount } as any);
      return <>{Node}</>;
    };

    act(() => {
      ReactDOM.render(<Comp />, container);
    });

    expect(afterMount).toHaveBeenCalledTimes(1);
    expect(afterMount.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });

  it('透传 HTML 属性给 div', () => {
    const container = getContainer();

    const Comp: React.FC = () => {
      const { Node } = useDivElement({
        'data-testid': 'my-div',
        className: 'custom-class',
      } as any);
      return <>{Node}</>;
    };

    act(() => {
      ReactDOM.render(<Comp />, container);
    });

    const el = container.querySelector('[data-testid="my-div"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.className).toBe('custom-class');

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    document.body.removeChild(container);
  });
});
