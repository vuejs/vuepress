/**
 * Inject option to Vue SFC
 * @param {object} options
 * @param {string} key
 * @param {any} value
 */
export function injectComponentOption (options, key, value) {
  const arrayInject = () => {
    if (!options[key]) options[key] = []
    options[key].push(...value)
  }
  const objectInject = () => {
    if (!options[key]) options[key] = {}
    Object.assign(options[key], value)
  }
  // const primitiveInject = () => options[key] = value

  switch (key) {
  case 'components': objectInject(); break
  case 'mixins': arrayInject(); break
  default: throw new Error('Unknown option name.')
  }
}

export function findPageForPath (pages, path) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.path === path) {
      return page
    }
  }
  return {
    path: '',
    frontmatter: {}
  }
}

export function findPageByKey (pages, key) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.key === key) {
      return page
    }
  }
  return {
    path: '',
    frontmatter: {}
  }
}

/**
 * Normalize config.
 * This utility is mainly for plugin developers. For some
 * plugins that need internationalize the text. but it's
 * not recommenbded to let plugin care about to the internal
 * i18n implementation, so this utility was born.
 *
 *
 * Usage:
 *
 * import { normalizeConfig } from '@app/util'
 * export default {
 *   data () {
 *     return { config }
 *   }
 *   computed: {
 *     normalizedConfig() {
 *       return normalizeConfig(this, config)
 *     }
 *   }
 * }
 *
 *
 * e.g.
 *
 * Config: : 'Text'
 * Normalized Config: 'Text'
 *
 * Config: : { '/': 'Text', '/zh/': '文本' }
 * Normalized Config: 'Text' or '文本'
 *
 * @param {Vue} component
 * @param {any} rawConfig
 * @returns {any}
 */
export function normalizeConfig (component, rawConfig) {
  const { $localePath } = component
  if (typeof rawConfig === 'object' && rawConfig[$localePath]) {
    return rawConfig[$localePath]
  }
  return rawConfig
}
