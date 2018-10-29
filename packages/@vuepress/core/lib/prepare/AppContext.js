'use strict'

/**
 * Module dependencies.
 */

const createMarkdown = require('./createMarkdown')
const loadConfig = require('./loadConfig')
const loadTheme = require('./loadTheme')
const {
  fs, path, logger, chalk, globby, sort,
  datatypes: { isFunction },
  fallback: { fsExistsFallback }
} = require('@vuepress/shared-utils')

const Page = require('./Page')
const ClientComputedMixin = require('./ClientComputedMixin')
const PluginAPI = require('../plugin-api/index')

/**
 * Expose AppContext.
 */

module.exports = class AppContext {
  /**
   * Instantiate the app context with a new API
   *
   * @param {string} sourceDir
   * @param {{
   *  isProd: boolean,
   *  plugins: pluginsConfig,
   *  theme: themeNameConfig
   *  temp: string
   * }} options
   */

  constructor (sourceDir, cliOptions = {}, isProd) {
    this.sourceDir = sourceDir
    this.cliOptions = cliOptions
    this.isProd = isProd

    const { tempPath, writeTemp } = createTemp(cliOptions.temp)
    this.tempPath = tempPath
    this.writeTemp = writeTemp

    this.vuepressDir = path.resolve(sourceDir, '.vuepress')
    this.siteConfig = loadConfig(this.vuepressDir)
    if (isFunction(this.siteConfig)) {
      this.siteConfig = this.siteConfig(this)
    }

    // TODO custom cwd.
    this.cwd = process.cwd()

    this.base = this.siteConfig.base || '/'
    this.themeConfig = this.siteConfig.themeConfig || {}

    const rawOutDir = cliOptions.outDir || this.siteConfig.dest
    this.outDir = rawOutDir
      ? require('path').resolve(this.cwd, rawOutDir)
      : require('path').resolve(sourceDir, '.vuepress/dist')

    this.pluginAPI = new PluginAPI(this)
    this.pages = [] // Array<Page>
    this.ClientComputedMixinConstructor = ClientComputedMixin(this.getSiteData())
  }

  /**
   * Load pages, load plugins, apply plugins / plugin options, etc.
   *
   * @returns {Promise<void>}
   * @api private
   */

  async process () {
    this.normalizeHeadTagUrls()
    await this.resolveTheme()
    this.resolveTemplates()

    this.applyInternalPlugins()
    this.applyUserPlugins()
    this.pluginAPI.initialize()

    this.markdown = createMarkdown(this)

    await this.resolvePages()
    await Promise.all(
      this.pluginAPI.options.additionalPages.values.map(async (options) => {
        await this.addPage(options)
      })
    )

    await this.pluginAPI.options.ready.apply()
    await this.pluginAPI.options.clientDynamicModules.apply(this)
    await this.pluginAPI.options.globalUIComponents.apply(this)
    await this.pluginAPI.options.enhanceAppFiles.apply(this)
  }

  /**
   * Apply internal plugins
   *
   * @api private
   */

  applyInternalPlugins () {
    const themeConfig = this.themeConfig
    const siteConfig = this.siteConfig

    const shouldUseLastUpdated = (
      themeConfig.lastUpdated ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].lastUpdated)
    )

    this.pluginAPI
      // internl core plugins
      .use(require('../internal-plugins/siteData'))
      .use(require('../internal-plugins/routes'))
      .use(require('../internal-plugins/rootMixins'))
      .use(require('../internal-plugins/enhanceApp'))
      .use(require('../internal-plugins/palette'))
      .use(require('../internal-plugins/style'))
      .use(require('../internal-plugins/layoutComponents'))
      .use(require('../internal-plugins/pageComponents'))
      .use(require('../internal-plugins/transformModule'))
      .use(require('../internal-plugins/dataBlock'))
      .use('@vuepress/last-updated', !!shouldUseLastUpdated)
      .use('@vuepress/register-components', {
        componentsDir: [
          path.resolve(this.sourceDir, '.vuepress/components'),
          path.resolve(this.themePath, 'global-components'),
          this.parentThemePath && path.resolve(this.parentThemePath, 'global-components')
        ]
      })
  }

  /**
   * Apply user plugins
   *
   * @api private
   */

  applyUserPlugins () {
    this.pluginAPI.useByPluginsConfig(this.cliOptions.plugins)
    if (this.parentThemePath) {
      this.pluginAPI.use(this.parentThemeEntryFile)
    }
    this.pluginAPI
      .use(this.themeEntryFile)
      .use(Object.assign({}, this.siteConfig, { name: '@vuepress/internal-site-config' }))
  }

  /**
   * normalize head tag urls for base
   *
   * @api private
   */

  normalizeHeadTagUrls () {
    if (this.base !== '/' && this.siteConfig.head) {
      this.siteConfig.head.forEach(tag => {
        const attrs = tag[1]
        if (attrs) {
          for (const name in attrs) {
            if (name === 'src' || name === 'href') {
              const value = attrs[name]
              if (value.charAt(0) === '/') {
                attrs[name] = this.base + value.slice(1)
              }
            }
          }
        }
      })
    }
  }

  /**
   * Make template configurable
   *
   * Resolving Priority (devTemplate as example):
   *
   *   1. siteConfig.devTemplate
   *   2. `dev.html` located at .vuepress/templates
   *   3. themeEntryFile.devTemplate
   *   4. default devTemplate
   *
   * @api private
   */

  resolveTemplates () {
    const { siteSsrTemplate, siteDevTemplate } = this.siteConfig

    const templateDir = path.resolve(this.vuepressDir, 'templates')
    const siteSsrTemplate2 = path.resolve(templateDir, 'ssr.html')
    const siteDevTemplate2 = path.resolve(templateDir, 'dev.html')

    const themeSsrTemplate = path.resolve(this.themePath, 'templates/ssr.html')
    const themeDevTemplate = path.resolve(this.themePath, 'templates/dev.html')

    const parentThemeSsrTemplate = path.resolve(this.themePath, 'templates/ssr.html')
    const parentThemeDevTemplate = path.resolve(this.themePath, 'templates/dev.html')

    const defaultSsrTemplate = path.resolve(__dirname, '../app/index.ssr.html')
    const defaultDevTemplate = path.resolve(__dirname, '../app/index.dev.html')

    const ssrTemplate = fsExistsFallback([
      siteSsrTemplate,
      siteSsrTemplate2,
      themeSsrTemplate,
      parentThemeSsrTemplate,
      defaultSsrTemplate
    ])

    const devTemplate = fsExistsFallback([
      siteDevTemplate,
      siteDevTemplate2,
      themeDevTemplate,
      parentThemeDevTemplate,
      defaultDevTemplate
    ])

    logger.debug('\nSSR Template File: ' + chalk.gray(ssrTemplate))
    logger.debug('\nDEV Template File: ' + chalk.gray(devTemplate))
    this.devTemplate = devTemplate
    this.ssrTemplate = ssrTemplate
  }

  /**
   * Find all page source files located in sourceDir
   *
   * @returns {Promise<void>}
   * @api private
   */

  async resolvePages () {
    // resolve pageFiles
    const patterns = ['**/*.md', '!.vuepress', '!node_modules']
    if (this.siteConfig.dest) {
      // #654 exclude dest folder when dest dir was set in
      // sourceDir but not in '.vuepress'
      const outDirRelative = path.relative(this.sourceDir, this.outDir)
      if (!outDirRelative.includes('..')) {
        patterns.push('!' + outDirRelative)
      }
    }
    const pageFiles = sort(await globby(patterns, { cwd: this.sourceDir }))

    await Promise.all(pageFiles.map(async (relative) => {
      const filePath = path.resolve(this.sourceDir, relative)
      await this.addPage({ filePath, relative })
    }))
  }

  /**
   * Add a page
   *
   * @returns {Promise<void>}
   * @api public
   */

  async addPage (options) {
    options.permalinkPattern = this.siteConfig.permalink
    const page = new Page(options, this)
    await page.process({
      markdown: this.markdown,
      computed: new this.ClientComputedMixinConstructor(),
      enhancers: this.pluginAPI.options.extendPageData.items
    })
    this.pages.push(page)
  }

  /**
   * Resolve theme
   *
   * @returns {Promise<void>}
   * @api private
   */

  async resolveTheme () {
    Object.assign(this, (await loadTheme(this)))
  }

  /**
   * Get the data to be delivered to the client.
   *
   * @returns {{
   *  title: string,
   *  description: string,
   *  base: string,
   *  pages: Page[],
   *  themeConfig: ThemeConfig,
   *  locales: Locales
   * }}
   * @api public
   */

  getSiteData () {
    const { locales } = this.siteConfig
    if (locales) {
      Object.keys(locales).forEach(path => {
        locales[path].path = path
      })
    }

    return {
      title: this.siteConfig.title || '',
      description: this.siteConfig.description || '',
      base: this.base,
      pages: this.pages.map(page => page.toJson()),
      themeConfig: this.siteConfig.themeConfig || {},
      locales
    }
  }
}

/**
 * Create a dynamic temp utility context that allow to lanuch
 * multiple apps with isolated context at the same time.
 * @param tempPath
 * @returns {{
 *  writeTemp: (function(file: string, content: string): string),
 *  tempPath: string
 * }}
 */

function createTemp (tempPath) {
  if (!tempPath) {
    tempPath = path.resolve(__dirname, '../../.temp')
  } else {
    tempPath = path.resolve(tempPath)
  }

  if (!fs.existsSync(tempPath)) {
    fs.ensureDirSync(tempPath)
  } else {
    fs.emptyDirSync(tempPath)
  }

  logger.tip(`\nTemp directory: ${chalk.gray(tempPath)}`)
  const tempCache = new Map()

  async function writeTemp (file, content) {
    const destPath = path.join(tempPath, file)
    await fs.ensureDir(path.parse(destPath).dir)
    // cache write to avoid hitting the dist if it didn't change
    const cached = tempCache.get(file)
    if (cached !== content) {
      await fs.writeFile(destPath, content)
      tempCache.set(file, content)
    }
    return destPath
  }

  return { writeTemp, tempPath }
}
