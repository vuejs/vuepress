import * as languages from './languages'
import type { HighlightLanguage } from './languages'

type LanguagesMap = Record<string, HighlightLanguage>

/**
 * A key-value map to get language info from alias
 *
 * - key: alias
 * - value: language
 */
let languagesMap: LanguagesMap

/**
 * Lazy generate languages map
 */
const getLanguagesMap = (): LanguagesMap => {
  if (!languagesMap) {
    languagesMap = Object.values(languages).reduce((result, item) => {
      item.aliases.forEach((alias) => {
        result[alias] = item
      })
      return result
    }, {})
  }

  return languagesMap
}

/**
 * Resolve language for highlight
 */
export const resolveLanguage = (alias: string): HighlightLanguage =>
  // if the alias does not have a match in the map
  // fallback to the alias itself
  getLanguagesMap()[alias] ?? {
    name: alias,
    ext: alias,
    aliases: [],
    deps: [],
  }
