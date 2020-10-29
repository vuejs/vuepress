const {
  logger,
  fs,
  path: { resolve }
} = require('@vuepress/shared-utils')
const readdirSync = dir => (fs.existsSync(dir) && fs.readdirSync(dir)) || []

module.exports = class ThemeAPI {
  constructor (theme, parentTheme) {
    this.theme = theme
    this.parentTheme = parentTheme || {}
    this.existsParentTheme = !!this.parentTheme.path
    this.vuepressPlugin = {
      name: '@vuepress/internal-theme-api',
      alias: {}
    }
    this.init()
  }

  setAlias (alias) {
    this.vuepressPlugin.alias = {
      ...this.vuepressPlugin.alias,
      ...alias
    }
  }

  init () {
    const alias = {
      '@current-theme': this.theme.path
    }
    if (this.existsParentTheme) {
      alias['@parent-theme'] = this.parentTheme.path
    }
    this.componentMap = this.getComponents()
    this.layoutComponentMap = this.getLayoutComponentMap()

    Object.keys(this.componentMap).forEach(name => {
      const { filename, path } = this.componentMap[name]
      alias[`@theme/components/${filename}`] = path
    })

    Object.keys(this.layoutComponentMap).forEach(name => {
      const { filename, path } = this.layoutComponentMap[name]
      alias[`@theme/layouts/${filename}`] = path
    })
    alias['@theme'] = this.theme.path
    this.setAlias(alias)
  }

  getComponents () {
    const componentDirs = [resolve(this.theme.path, 'components')]
    if (this.existsParentTheme) {
      componentDirs.unshift(resolve(this.parentTheme.path, 'components'))
    }
    return resolveSFCs(componentDirs)
  }

  getLayoutComponentMap () {
    const layoutDirs = [
      resolve(this.theme.path, '.'),
      resolve(this.theme.path, 'layouts')
    ]
    if (this.existsParentTheme) {
      layoutDirs.unshift(
        resolve(this.parentTheme.path, '.'),
        resolve(this.parentTheme.path, 'layouts')
      )
    }
    // built-in named layout or not.
    const layoutComponentMap = resolveSFCs(layoutDirs)

    const { Layout, NotFound } = layoutComponentMap
    // layout component does not exist.
    if (!Layout) {
      const fallbackLayoutPath = resolve(__dirname, 'Layout.fallback.vue')
      layoutComponentMap.Layout = {
        filename: 'Layout.vue',
        componentName: 'Layout',
        path: fallbackLayoutPath,
        isInternal: true
      }
      logger.warn(
        `[vuepress] Cannot resolve Layout.vue file in \n ${layoutDirs.join('\n')}, `
          + `\n fallback to default layout: ${fallbackLayoutPath}`
      )
    }
    if (!NotFound) {
      layoutComponentMap.NotFound = {
        filename: 'NotFound.vue',
        componentName: 'NotFound',
        path: resolve(__dirname, '../../client/components/NotFound.vue'),
        isInternal: true
      }
    }
    return layoutComponentMap
  }
}

/**
 * Resolve Vue SFCs, return a Map
 *
 * @param dirs
 * @returns {*}
 */

function resolveSFCs (dirs) {
  return dirs
    .map(layoutDir =>
      readdirSync(layoutDir)
        .filter(filename => filename.endsWith('.vue'))
        .map(filename => {
          const componentName = getComponentName(filename)
          return {
            filename,
            componentName,
            isInternal: isInternal(componentName),
            path: resolve(layoutDir, filename)
          }
        })
    )
    .reduce((arr, next) => {
      arr.push(...next)
      return arr
    }, [])
    .reduce((map, component) => {
      map[component.componentName] = component
      return map
    }, {})
}

/**
 * normalize component name
 *
 * @param {string} filename
 * @returns {string}
 */

function getComponentName (filename) {
  filename = filename.slice(0, -4)
  if (filename === '404') {
    filename = 'NotFound'
  }
  return filename
}

/**
 * Whether it's agreed layout component
 *
 * @param name
 * @returns {boolean}
 */

function isInternal (name) {
  return name === 'Layout' || name === 'NotFound'
}
