const md = require('../markdown')
const frontmatter = require('yaml-front-matter')

module.exports = function (src) {
  currentFile = this.resourcePath
  const content = frontmatter.loadFront(src).__content
  const html = md.render(content)
  return `<template><div class="markdown">${html}</div></template>`
}
