const { path: { resolve }} = require('@vuepress/shared-utils')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (patterns = [], context) => ({
  name: `@vuepress/plugin-public-files`,

  multiple: true,

  chainWebpack (config) {
    if (!Array.isArray(patterns)) patterns = [patterns]

    config
      .plugin('copy')
      .use(CopyPlugin, [patterns.map((pattern) => {
        if (typeof pattern === 'string') {
          pattern = { from: pattern }
        } else {
          pattern = { ...pattern }
        }
        pattern.from = resolve(context.sourceDir, pattern.from || '')
        pattern.to = resolve(context.outDir, pattern.to || '')
      })])
  }
})
