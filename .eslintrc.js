module.exports = {
  root: true,
  globals: {
    React: true,
    JSX: true,
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'arrow-parens': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/consistent-type-imports': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
