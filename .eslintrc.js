module.exports = {
  root: true,
  extends: 'vuepress',
  globals: {
    __VERSION__: 'readonly',
    __DEV__: 'readonly',
    __SSR__: 'readonly',
    __VUE_HMR_RUNTIME__: 'writable',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['clientAppEnhance.ts'],
      rules: {
        'vue/match-component-file-name': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'vue/one-component-per-file': 'off',
      },
    },
  ],
}
