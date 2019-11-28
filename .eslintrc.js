module.exports = {
  root: true,
  extends: [
    'plugin:vue-libs/recommended'
  ],
  rules: {
    indent: ['error', 2, { MemberExpression: 'off' }],
    'no-undef': ['error'],
    'operator-linebreak': ['error', 'before']
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.spec.js'],
      extends: ['plugin:jest/recommended']
    },
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ]
}
