module.exports = {
  plugins: ['react-hooks'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    camelcase: 0,
    'react/jsx-curly-newline': 0,
    '@typescript-eslint/naming-convention': 0,
    'no-useless-escape': 0,
    'no-unneeded-ternary': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-console': 2,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
};
