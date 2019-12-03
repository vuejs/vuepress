module.exports = {
  root: true,

  extends: [
    'plugin:vue-libs/recommended',
    'plugin:vue/recommended'
  ],

  rules: {
    indent: ['error', 2, { MemberExpression: 'off' }],

    'no-undef': ['error'],

    'operator-linebreak': ['error', 'before'],

    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['js', 'vue'],
        shouldMatchCase: false
      }
    ]
  },

  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-useless-constructor': 'off'
      }
    },
    {
      files: [
        '**/__tests__/**/*.spec.js',
        '**/__tests__/**/*.spec.ts'
      ],
      extends: ['plugin:jest/recommended']
    }
  ]
}
