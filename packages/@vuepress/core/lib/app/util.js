import Vue from 'vue'
import { loadComponent } from '@internal/async-component'

export function injectMixins (options, mixins) {
  if (!options.mixins) {
    options.mixins = []
  }
  options.mixins.push(...mixins)
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

export function registerComponent (key) {
  return loadComponent(key).then(comp => {
    Vue.component(key, comp.default)
    return comp.default
  })
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
