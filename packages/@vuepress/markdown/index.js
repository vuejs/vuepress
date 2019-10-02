'use strict'

/**
 * Module dependencies.
 */

const Config = require('markdown-it-chain')
const highlight = require('./lib/highlight')
const { PLUGINS, REQUIRED_PLUGINS } = require('./lib/constant')
const highlightLinesPlugin = require('./lib/highlightLines')
const preWrapperPlugin = require('./lib/preWrapper')
const lineNumbersPlugin = require('./lib/lineNumbers')
const componentPlugin = require('./lib/component')
const hoistScriptStylePlugin = require('./lib/hoist')
const convertRouterLinkPlugin = require('./lib/link')
const snippetPlugin = require('./lib/snippet')
const emojiPlugin = require('markdown-it-emoji')
const anchorPlugin = require('markdown-it-anchor')
const tocPlugin = require('markdown-it-table-of-contents')
const {
  slugify: _slugify,
  parseHeaders,
  logger, chalk, normalizeConfig,
  moduleResolver: { getMarkdownItResolver }
} = require('@vuepress/shared-utils')

/**
 * Create markdown by config.
 */

module.exports = (markdown = {}) => {
  const {
    externalLinks,
    anchor,
    toc,
    plugins,
    lineNumbers,
    beforeInstantiate,
    afterInstantiate
  } = markdown

  const resolver = getMarkdownItResolver()

  // allow user config slugify
  const slugify = markdown.slugify || _slugify

  // using chainedAPI
  const config = new Config()

  config
    .options
      .html(true)
      .highlight(highlight)
      .end()

    .plugin(PLUGINS.COMPONENT)
      .use(componentPlugin)
      .end()

    .plugin(PLUGINS.HIGHLIGHT_LINES)
      .use(highlightLinesPlugin)
      .end()

    .plugin(PLUGINS.PRE_WRAPPER)
      .use(preWrapperPlugin)
      .end()

    .plugin(PLUGINS.SNIPPET)
      .use(snippetPlugin)
      .end()

    .plugin(PLUGINS.CONVERT_ROUTER_LINK)
      .use(convertRouterLinkPlugin, [Object.assign({
        target: '_blank',
        rel: 'noopener noreferrer'
      }, externalLinks)])
      .end()

    .plugin(PLUGINS.HOIST_SCRIPT_STYLE)
      .use(hoistScriptStylePlugin)
      .end()

    .plugin(PLUGINS.EMOJI)
      .use(emojiPlugin)
      .end()

    .plugin(PLUGINS.ANCHOR)
      .use(anchorPlugin, [Object.assign({
        slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
      }, anchor)])
      .end()

    .plugin(PLUGINS.TOC)
      .use(tocPlugin, [Object.assign({
        slugify,
        includeLevel: [2, 3],
        format: parseHeaders
      }, toc)])
      .end()

  if (lineNumbers) {
    config
      .plugin(PLUGINS.LINE_NUMBERS)
        .use(lineNumbersPlugin)
  }

  beforeInstantiate && beforeInstantiate(config)

  const md = config.toMd(require('markdown-it'), markdown)

  const pluginsConfig = normalizeConfig(plugins || [])
  pluginsConfig.forEach(([pluginRaw, pluginOptions]) => {
    const plugin = resolver.resolve(pluginRaw)
    if (plugin.entry) {
      md.use(plugin.entry, pluginOptions)
    } else {
      // TODO: error handling
    }
  })

  afterInstantiate && afterInstantiate(md)

  module.exports.dataReturnable(md)

  // expose slugify
  md.slugify = slugify

  return md
}

module.exports.dataReturnable = function dataReturnable (md) {
  // override render to allow custom plugins return data
  const render = md.render
  md.render = (...args) => {
    md.$data = {}
    md.$data.__data_block = {}
    md.$dataBlock = md.$data.__data_block
    const html = render.call(md, ...args)
    return {
      html,
      data: md.$data,
      dataBlockString: toDataBlockString(md.$dataBlock)
    }
  }
}

function toDataBlockString (ob) {
  if (Object.keys(ob).length === 0) {
    return ''
  }
  return `<data>${JSON.stringify(ob)}</data>`
}

function isRequiredPlugin (plugin) {
  return REQUIRED_PLUGINS.includes(plugin)
}

function removePlugin (config, plugin) {
  logger.debug(`Built-in markdown-it plugin ${chalk.green(plugin)} was removed.`)
  config.plugins.delete(plugin)
}

function removeAllBuiltInPlugins (config) {
  Object.keys(PLUGINS).forEach(key => {
    if (!isRequiredPlugin(PLUGINS[key])) {
      removePlugin(config, PLUGINS[key])
    }
  })
}

module.exports.isRequiredPlugin = isRequiredPlugin
module.exports.removePlugin = removePlugin
module.exports.removeAllBuiltInPlugins = removeAllBuiltInPlugins
module.exports.PLUGINS = PLUGINS
