'use strict'

/**
 * Module dependencies.
 */

const Config = require('markdown-it-chain')
const highlight = require('./highlight')
const highlightLinesPlugin = require('./highlightLines')
const preWrapperPlugin = require('./preWrapper')
const lineNumbersPlugin = require('./lineNumbers')
const componentPlugin = require('./component')
const hoistScriptStylePlugin = require('./hoist')
const convertRouterLinkPlugin = require('./link')
const containersPlugin = require('./containers')
const markdownSlotsContainersPlugin = require('./markdownSlotsContainers')
const snippetPlugin = require('./snippet')
const emojiPlugin = require('markdown-it-emoji')
const anchorPlugin = require('markdown-it-anchor')
const tocPlugin = require('markdown-it-table-of-contents')
const { parseHeaders, slugify: _slugify } = require('@vuepress/shared-utils')

/**
 * Create markdown by config.
 */

module.exports = ({
  slugify,
  externalLinks,
  anchor,
  toc,
  lineNumbers,
  beforeInstantiate,
  afterInstantiate
} = {}) => {
  // allow user config slugify
  slugify = slugify || _slugify

  // using chainedAPI
  const config = new Config()

  config
    .options
      .html(true)
      .highlight(highlight)
      .end()

    .plugin('component')
      .use(componentPlugin)
      .end()

    .plugin('highlight-lines')
      .use(highlightLinesPlugin)
      .end()

    .plugin('pre-wrapper')
      .use(preWrapperPlugin)
      .end()

    .plugin('snippet')
      .use(snippetPlugin)
      .end()

    .plugin('convert-router-link')
      .use(convertRouterLinkPlugin, [Object.assign({
        target: '_blank',
        rel: 'noopener noreferrer'
      }, externalLinks)])
      .end()

    .plugin('hoist-script-style')
      .use(hoistScriptStylePlugin)
      .end()

    .plugin('containers')
      .use(containersPlugin)
      .end()

    .plugin('markdown-slots-containers')
      .use(markdownSlotsContainersPlugin)
      .end()

    .plugin('emoji')
      .use(emojiPlugin)
      .end()

    .plugin('anchor')
      .use(anchorPlugin, [Object.assign({
        slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
      }, anchor)])
      .end()

    .plugin('toc')
      .use(tocPlugin, [Object.assign({
        slugify,
        includeLevel: [2, 3],
        format: parseHeaders
      }, toc)])
      .end()

  if (lineNumbers) {
    config
      .plugin('line-numbers')
        .use(lineNumbersPlugin)
  }

  beforeInstantiate && beforeInstantiate(config)

  const md = config.toMd()

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
