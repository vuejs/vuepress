import type { HighlightLanguage } from './languages'
import { getPrism, loadLangs } from './prismUtils'

export type CodeHighlighter = (code: string) => string

export const createCodeHighlighter = (
  language: HighlightLanguage
): CodeHighlighter | null => {
  const Prism = getPrism()

  const lang = language.name
  const docLang = language.docLang

  // get the languages that need to be loaded
  const langsToLoad: string[] = []

  // current language
  if (!Prism.languages[lang]) {
    langsToLoad.push(lang)
  }

  // doc language of current language
  if (docLang && !Prism.languages[docLang]) {
    langsToLoad.push(docLang)
  }

  // try to load languages if necessary
  if (langsToLoad.length) {
    loadLangs(langsToLoad)
  }

  // return null if current language could not be loaded
  // the doc language is not required so we don't check it here
  if (!Prism.languages[lang]) {
    return null
  }

  return (code) => Prism.highlight(code, Prism.languages[lang], lang)
}
