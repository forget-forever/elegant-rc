/**
 * react-dom/client 的兼容 shim，用于在 React 17 环境下运行 @testing-library/react v16
 */
const ReactDOM = require('react-dom');

module.exports = {
  createRoot: (container) => ({
    render: (element) => ReactDOM.render(element, container),
    unmount: () => ReactDOM.unmountComponentAtNode(container),
  }),
};
