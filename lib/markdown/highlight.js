const chalk = require('chalk')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
const escapeHtml = require('escape-html')
const logger = require('../util/logger')

const noVPreRE = /^(.*){no-v-pre}$/

// highlight will be disabled with {no-v-pre} except for these languages
const highlightableLanguagesWithNoVPre = [
  'markup',
  'markdown'
]

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function wrap (code, lang, noVPre = false) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  const vPreAttr = noVPre ? '' : 'v-pre'
  return `<pre ${vPreAttr} class="language-${lang}"><code>${code}</code></pre>`
}

module.exports = (str, lang) => {
  // check if {no-v-pre} appears
  const noVPreMatch = lang.match(noVPreRE)
  const noVPre = noVPreMatch !== null
  if (noVPre) {
    lang = noVPreMatch[1]
  }

  // normalize the language name for prism
  lang = lang.toLowerCase()

  // if no language is specified, treat as 'text'
  if (!lang) {
    return wrap(str, 'text', noVPre)
  }

  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }

  // if the language is not supported highlighting with {no-v-pre}
  if (noVPre && !highlightableLanguagesWithNoVPre.includes(lang)) {
    return wrap(str, 'text', noVPre)
  }

  // try to highlighting the code
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      logger.warn(chalk.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`))
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang, noVPre)
  }

  // if the language is not supported by prism, treat as 'text'
  return wrap(str, 'text', noVPre)
}
