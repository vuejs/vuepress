module.exports = {
  plugins: [
    [require('../../..'), {
      from: '_assets',
      to: 'assets',
      ignore: ['*.ignore'],
    }]
  ]
}
