const { getOptions } = require('loader-utils')
const frontmatter = require('yaml-front-matter')

module.exports = function (src) {
  const { markdown } = getOptions(this)
  const content = frontmatter.loadFront(src).__content
  const { html, hoistedTags } = markdown.renderWithHoisting(content)
  return (
    `<template>\n` +
      `<div class="markdown">${html}</div>\n` +
    `</template>\n` +
    hoistedTags.join('\n')
  )
}
