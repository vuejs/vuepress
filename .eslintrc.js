module.exports = {
  root: true,
  extends: [
    'plugin:vue-libs/recommended',
    'plugin:jest/recommended'
  ],
  rules: {
    indent: ['error', 2, { MemberExpression: 'off' }]
  }
}
