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
    ctx.pluginAPI.options.chainMarkdown.syncApply(config)
  }

  const afterInstantiate = md => {
    extendMarkdown && extendMarkdown(md)
    ctx.pluginAPI.options.extendMarkdown.syncApply(md)
  }

  return createMarkdown(
    Object.assign(markdownConfig, {
      beforeInstantiate,
      afterInstantiate
    })
  )
}
