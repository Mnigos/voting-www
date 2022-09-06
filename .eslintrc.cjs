module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    'import/parser': '@typescript-eslint/parser',
    'import/resolver': {
      node: {
        paths: ['~/'],
        extensions: ['.js', '.ts', '.svelte'],
      },
      alias: {
        map: [['~', './src/']],
        extensions: ['.ts', '.js', '.svelte'],
      },
    },
    'svelte3/typescript': true,
  },
  plugins: [
    'import',
    'svelte3',
    'prettier',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:svelte/recommended',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
    {
      files: ['**/*.spec.ts'],
      rules: {
        'unicorn/filename-case': [
          'error',
          { cases: { pascalCase: true, kebabCase: true } },
        ],
      },
    },
  ],
  ignorePatterns: ['README.md'],
  rules: {
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: [/^\$/, 'README.md$'] },
    ],
  },
}
