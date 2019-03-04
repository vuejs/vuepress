'use strict'

/**
 * Module dependencies.
 */

const createMarkdown = require('@vuepress/markdown')

/**
 * Expose createMarkdown.
 */

module.exports = function (ctx) {
  const { markdown: markdownConfig = {}} = ctx.siteConfig
  const { chainMarkdown, extendMarkdown } = markdownConfig

  const beforeInstantiate = config => {
    chainMarkdown && chainMarkdown(config)
    ctx.pluginAPI.applySyncOption('chainMarkdown', config)
  }

  const afterInstantiate = md => {
    extendMarkdown && extendMarkdown(md)
    ctx.pluginAPI.applySyncOption('extendMarkdown', md)
  }

  return createMarkdown(
    Object.assign(markdownConfig, {
      beforeInstantiate,
      afterInstantiate
    })
  )
}
