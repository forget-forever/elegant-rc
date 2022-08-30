module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  plugins: ['react-hooks', 'react'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/consistent-type-imports': 1,
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    camelcase: 0,
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-useless-escape': 0,
    'no-unneeded-ternary': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-constant-binary-expression': 0,
    'no-unused-private-class-members': 0,
    'prefer-object-has-own': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/no-invalid-void-type': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
  },
};
