module.exports = (options, context) => ({
  name: 'translation-comparison',
  clientOnly: true,
  enhanceAppFiles: [
    context.resolve(__dirname, 'client.js')
  ],
  additionalPages: [
    {
      override: false, // will throw warning when '/translation/' has existed
      route: '/translation/',
      path: context.resolve(__dirname, 'translation.md')
    }
  ]
})
