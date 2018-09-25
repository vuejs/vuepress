'use strict'

/**
 * Module dependencies.
 */

const Config = require('markdown-it-chain')
const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const preWrapper = require('./preWrapper')
const lineNumbers = require('./lineNumbers')
const component = require('./component')
const hoistScriptStyle = require('./hoist')
const convertRouterLink = require('./link')
const containers = require('./containers')
const snippet = require('./snippet')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const _slugify = require('./slugify')
const { parseHeaders } = require('@vuepress/shared-utils')

/**
 * Create markdown by config.
 */

module.exports = ({
  markdown = {}
} = {}) => {
  // allow user config slugify
  const slugify = markdown.slugify || _slugify
  // using chainedAPI
  const config = new Config()

  config
    .options
      .html(true)
      .highlight(highlight)
      .end()

    .plugin('component')
      .use(component)
      .end()

    .plugin('highlight-lines')
      .use(highlightLines)
      .end()

    .plugin('pre-wrapper')
      .use(preWrapper)
      .end()

    .plugin('snippet')
      .use(snippet)
      .end()

    .plugin('convert-router-link')
      .use(convertRouterLink, [Object.assign({
        target: '_blank',
        rel: 'noopener noreferrer'
      }, markdown.externalLinks)])
      .end()

    .plugin('hoist-script-style')
      .use(hoistScriptStyle)
      .end()

    .plugin('containers')
      .use(containers)
      .end()

    .plugin('emoji')
      .use(emoji)
      .end()

    .plugin('anchor')
      .use(anchor, [Object.assign({
        slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
      }, markdown.anchor)])
      .end()

    .plugin('toc')
      .use(toc, [Object.assign({
        slugify,
        includeLevel: [2, 3],
        format: parseHeaders
      }, markdown.toc)])
      .end()

  if (markdown.lineNumbers) {
    config
      .plugin('line-numbers')
        .use(lineNumbers)
  }

  if (markdown.chainMarkdown) {
    markdown.chainMarkdown(config)
  }

  const md = config.toMd()

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  module.exports.dataReturnable(md)

  // expose slugify
  md.slugify = slugify

  return md
}

module.exports.dataReturnable = function dataReturnable (md) {
  // override render to allow custom plugins return data
  const render = md.render
  md.render = (...args) => {
    md.__data = {}
    const html = render.call(md, ...args)
    return {
      html,
      data: md.__data
    }
  }
}
