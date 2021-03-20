import * as Prism from 'prismjs'
import { loadLanguages } from './loadLanguages'

const languageNameMap = {
  html: 'markup',
  vue: 'markup',
}

// documentation language of corresponding language
const docLangMap = {
  csharp: 'xml-doc',
  fsharp: 'xml-doc',
  java: 'javadoc',
  javascript: 'jsdoc',
  php: 'phpdoc',
  typescript: 'jsdoc',
}

export type Highlighter = (code: string) => string

/**
 * Resolve syntax highlighter for corresponding language
 */
export const resolveHighlighter = (language: string): Highlighter | null => {
  const lang = languageNameMap[language] || language

  // get the languages that need to be loaded
  const langsToLoad: string[] = []

  // current language
  if (!Prism.languages[lang]) {
    langsToLoad.push(lang)
  }

  // doc language of current language
  const docLang = docLangMap[lang]
  if (docLang && !Prism.languages[docLang]) {
    langsToLoad.push(docLang)
  }

  // try to load languages if necessary
  if (langsToLoad.length) {
    loadLanguages(langsToLoad)
  }

  // return null if current language could not be loaded
  // the doc language is not required so we don't check it here
  if (!Prism.languages[lang]) {
    return null
  }

  return (code) => Prism.highlight(code, Prism.languages[lang], lang)
}
