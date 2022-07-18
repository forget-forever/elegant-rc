module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    deeps: 1,
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    'guard-for-in': 0,
    'no-unused-expressions': 0,
    '@typescript-eslint/no-shadow': 1,
    'no-useless-escape': 0,
    'no-unneeded-ternary': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
