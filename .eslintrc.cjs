module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env'],
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single']
  },
};
  