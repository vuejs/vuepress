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
  // get the languages that need to be loaded
  const lang: string = languageNameMap[language] || language
  const langsToLoad = [lang]

  // doc language of current language
  if (docLangMap[lang]) {
    langsToLoad.push(docLangMap[lang])
  }

  // try to load languages
  loadLanguages(langsToLoad)

  // return null if current language could not be loaded
  // the doc language is not required so we don't check it here
  if (!Prism.languages[lang]) {
    return null
  }

  return (code) => Prism.highlight(code, Prism.languages[lang], lang)
}
