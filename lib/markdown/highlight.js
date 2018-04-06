const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

module.exports = (str, lang) => {
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      throw new Error(`[vuepress] Syntax highlight for language "${lang}" is not supported.`)
    }
  }
  if (prism.languages[lang]) {
    const res = prism.highlight(str, prism.languages[lang], lang)
    return `<pre v-pre class="language-${lang}"><code>${res}</code></pre>`
  }
  return ''
}
