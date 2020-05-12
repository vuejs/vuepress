module.exports = {
  name: 'test',
  multiple: false,
  alias: {
    test: 'alias',
  },
  chainWebpack: (config) => config.resolve.alias.set('test2', 'chainWebpack'),
  define: {
    __TEST__: 'define',
  },
}
