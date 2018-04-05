const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

module.exports = (str, lang) => {
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
