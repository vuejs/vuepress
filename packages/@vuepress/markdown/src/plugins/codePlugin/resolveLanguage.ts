import * as languages from './languages'
import type { HighlightLanguage } from './languages'

/**
 * A key-value map to get language info from alias
 *
 * - key: alias
 * - value: language
 */
const languagesMap: Record<string, HighlightLanguage> = Object.values(
  languages
).reduce((result, item) => {
  item.aliases.forEach((alias) => {
    result[alias] = item
  })
  return result
}, {})

/**
 * Resolve language for highlight
 */
export const resolveLanguage = (alias: string): HighlightLanguage =>
  // if the alias does not have a match in the map
  // fallback to the alias itself
  languagesMap[alias] ?? {
    name: alias,
    ext: alias,
    aliases: [],
  }
