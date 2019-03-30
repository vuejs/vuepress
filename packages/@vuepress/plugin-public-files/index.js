const {
  fs: { existsSync },
  path: { resolve }
} = require('@vuepress/shared-utils')
const CopyPlugin = require('copy-webpack-plugin')
const mergeable = require('vuepress-mergeable')

module.exports = mergeable((patterns, context) => ({
  name: `@vuepress/plugin-public-files`,

  chainWebpack (config) {
    if (!Array.isArray(patterns)) patterns = [patterns]

    config
      .plugin('copy')
      .use(CopyPlugin, [patterns.map((pattern) => {
        pattern = typeof pattern === 'string'
          ? { from: pattern }
          : { ...pattern }

        // `from` will be resolved based on `sourceDir`
        pattern.from = resolve(context.sourceDir, pattern.from || '')
        if (!existsSync(pattern.from)) return

        // `to` will be resolved based on `outDir`
        pattern.to = resolve(context.outDir, pattern.to || '')

        // ignore dotfiles and markdown by default
        pattern.ignore = pattern.ignore || ['.*', '.*/**', '*.md']

        return pattern
      }).filter(p => p)])
  }
}), 'flat')
