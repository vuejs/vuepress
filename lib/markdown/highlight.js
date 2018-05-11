const chalk = require('chalk')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
const escapeHtml = require('escape-html')

const vPreRE = /^(.*):v$/

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function wrap (code, lang, useVPre = true) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  const vPreAttr = useVPre ? 'v-pre' : ''
  return `<pre ${vPreAttr} class="language-${lang}"><code>${code}</code></pre>`
}

module.exports = (str, lang) => {
  const vPreMatch = lang.match(vPreRE)
  const useVPre = vPreMatch === null
  if (!useVPre) {
    lang = vPreMatch[1]
  }
  if (!lang) {
    return wrap(str, 'text', useVPre)
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      console.log(chalk.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`))
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang, useVPre)
  }
  return wrap(str, 'text', useVPre)
}
