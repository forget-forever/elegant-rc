export default {
  esm: 'babel',
  cjs: 'babel',
  lessInBabelMode: true,
  cssModules: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
        minimal: true,
      },
    ],
  ],
};
