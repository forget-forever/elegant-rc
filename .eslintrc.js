module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    camelcase: 0,
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-useless-escape': 0,
    'no-unneeded-ternary': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
