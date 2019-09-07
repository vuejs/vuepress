import Vue from 'vue'
import layoutComponents from '@internal/layout-components'
import pageComponents from '@internal/page-components'

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  const cache = Object.create(null)
  // eslint-disable-next-line func-names
  return function cachedFn (str) {
    const hit = cache[str]
    // eslint-disable-next-line no-return-assign
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Capitalize a string.
 */
const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * This method was for securely getting Vue component when components
 * are named in different style.
 *
 * e.g. a component named `a-b` can be also getted by `AB`, It's the
 * same the other way round
 *
 * @param {function} getter a function of getting component by name
 * @param {string} name component's name
 * @returns {Component|AsyncComponent}
 */
export function getComponent (getter, name) {
  if (!name) return
  if (getter(name)) return getter(name)

  const isKebabCase = name.includes('-')
  if (isKebabCase) return getter(capitalize(camelize(name)))

  return getter(capitalize(name)) || getter(hyphenate(name))
}

const asyncComponents = Object.assign({}, layoutComponents, pageComponents)
const asyncComponentsGetter = name => asyncComponents[name]
const pageComponentsGetter = layout => pageComponents[layout]
const layoutComponentsGetter = layout => layoutComponents[layout]
const globalComponentsGetter = name => Vue.component(name)

export function getPageAsyncComponent (pageKey) {
  return getComponent(pageComponentsGetter, pageKey)
}

export function getLayoutAsyncComponent (layout) {
  return getComponent(layoutComponentsGetter, layout)
}

export function getAsyncComponent (name) {
  return getComponent(asyncComponentsGetter, name)
}

export function getVueComponent (name) {
  return getComponent(globalComponentsGetter, name)
}

export function ensureAsyncComponentsLoaded (...names) {
  return Promise.all(names.filter(v => v).map(async (name) => {
    if (!getVueComponent(name) && getAsyncComponent(name)) {
      const comp = await getAsyncComponent(name)()
      Vue.component(name, comp.default)
    }
  }))
}

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

/**
 * Set global info in `window.__VUEPRESS__` for debugging.
 *
 * @param {string}key
 * @param {any} value
 */
export function setGlobalInfo (key, value) {
  if (typeof window === 'undefined' || !window.__VUEPRESS__) {
    return
  }
  window.__VUEPRESS__[key] = value
}
