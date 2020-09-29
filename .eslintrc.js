module.exports = {
  root: true,
  extends: 'vuepress',
  overrides: [
    {
      files: ['*.ts'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['packages/**/tsconfig.json', 'playground/tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],

  rules: {
    // TODO: disable for vue 3 Fragment feature
    'vue/valid-template-root': 'off',
  },
}
