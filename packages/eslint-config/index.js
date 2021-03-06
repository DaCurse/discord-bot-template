module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: { node: true, es6: true },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist/**'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
}
