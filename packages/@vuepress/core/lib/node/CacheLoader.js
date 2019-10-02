'use strict'

/**
 * Module dependencies.
 */

const {
  path, toAbsolutePath, chalk, logger,
  datatypes: { isString, isBoolean }
} = require('@vuepress/shared-utils')

/**
 * Get cache directory and cache identifier via config.
 * @param {object} siteConfig
 * @param {object} options
 */

exports.getCacheLoaderOptions = function (siteConfig, options, cwd, isProd) {
  const defaultCacheDirectory = path.resolve(__dirname, '../../node_modules/.cache/vuepress')
  let cache = options.cache || siteConfig.cache || defaultCacheDirectory

  if (isBoolean(cache)) {
    if (cache === true) {
      cache = defaultCacheDirectory
    }
  } else if (!isString(cache)) {
    throw new Error(`expected cache option to be string or boolean, but got ${typeof cache}`)
  }

  const cacheDirectory = toAbsolutePath(cache, cwd)
  const cacheIdentifier = JSON.stringify({
    vuepress: require('../../package.json').version,
    'cache-loader': require('cache-loader/package.json').version,
    'vue-loader': require('cache-loader/package.json').version,
    isProd,
    config: (
      (
        siteConfig.markdown
          ? JSON.stringify(siteConfig.markdown)
          : ''
      )
      + (
        siteConfig.markdown && siteConfig.markdown.extendMarkdown
          ? siteConfig.markdown.extendMarkdown.toString()
          : ''
      )
      + (
        siteConfig.extendMarkdown
          ? siteConfig.extendMarkdown.toString()
          : ''
      )
      + (siteConfig.chainWebpack || '').toString()
      + (siteConfig.configureWebpack || '').toString()
    )
  })

  logger.debug('Cache directory: ' + chalk.gray(cacheDirectory))
  logger.debug('Cache identifier : ' + chalk.gray(cacheIdentifier))

  return { cacheDirectory, cacheIdentifier }
}
