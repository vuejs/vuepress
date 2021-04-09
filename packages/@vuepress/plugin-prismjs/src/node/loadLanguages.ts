import * as Prism from 'prismjs'
import * as rawLoadLanguages from 'prismjs/components/index'

// prevent warning messages
// eslint-disable-next-line no-import-assign
rawLoadLanguages.silent = true

export const loadLanguages = (languages: string[]): void => {
  const langsToLoad = languages.filter((item) => !Prism.languages[item])
  if (langsToLoad.length) {
    rawLoadLanguages(langsToLoad)
  }
}
