import type * as PrismType from 'prismjs'
import { debug } from '@vuepress/utils'

const log = debug('vuepress:markdown/code')

// Prismjs is an IIFE module, so we'd better to lazy-load it
let Prism: typeof PrismType
let loadLanguages: ((languages?: string | string[]) => void) & {
  silent: boolean
}

/**
 * Lazy load and initialize prismjs
 *
 * The docs of Prismjs says those default languages will be loaded
 * automatically, but it seems that we have to load them manually.
 *
 * @see https://prismjs.com/#basic-usage-node
 */
export const initializePrism = (): void => {
  Prism = require('prismjs')

  loadLanguages = require('prismjs/components/index')
  // prevent warning messages
  loadLanguages.silent = true

  loadLanguages(['markup', 'css', 'clike', 'javascript'])
}

/**
 * Get the Prism object
 */
export const getPrism = (): typeof PrismType => {
  if (!Prism) {
    initializePrism()
  }
  return Prism
}

/**
 * Wrap the raw `loadLanguages` function of prismjs
 */
export const loadLangs = (langs: string[]): void => {
  try {
    loadLanguages(langs)
  } catch {
    log(`prismjs does not support '${langs}'`)
  }
}
