const { getOptions } = require('loader-utils')
const frontmatter = require('yaml-front-matter')

module.exports = function (src) {
  const { markdown } = getOptions(this)
  currentFile = this.resourcePath
  const content = frontmatter.loadFront(src).__content
  const html = markdown.render(content)
  return `<template><div class="markdown">${html}</div></template>`
}
