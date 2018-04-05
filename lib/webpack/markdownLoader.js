const prism = require('prismjs')
const frontmatter = require('yaml-front-matter')
const loadLanguages = require('prismjs/components/index')

const md = require('markdown-it')({
  html: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang === 'vue') {
      lang = 'html'
    }
    if (!prism.languages[lang]) {
      try {
        loadLanguages([lang])
      } catch (e) {
        throw new Error(`[vuepress] Syntax highlight for language "${lang}" is not supported.`)
        return ''
      }
    }
    if (prism.languages[lang]) {
      let res = prism.highlight(str, prism.languages[lang], lang)
      return `<pre class="language-${lang}"><code v-pre>${res}</code></pre>`
    }
    return ''
  }
})

// TODO containers (warning, tip, etc.)
// TODO translate links to router-link & translate md links to html
// TODO support using code blocks as demo

module.exports = function (src) {
  const content = frontmatter.loadFront(src).__content
  const html = md.render(content)
  return `<template><div class="markdown">${html}</div></template>`
}
