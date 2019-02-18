'use strict'

/**
 * Module dependencies.
 */

const createMarkdown = require('./createMarkdown')
const loadConfig = require('./loadConfig')
const loadTheme = require('./loadTheme')
const { getCacheLoaderOptions } = require('./CacheLoader')
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
  static getInstance (...args) {
    if (!AppContext._instance) {
      AppContext._instance = new AppContext(...args)
    }
    return AppContext._instance
  }

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
    logger.debug('sourceDir', sourceDir)
    this.sourceDir = sourceDir
    this.cliOptions = cliOptions
    this.isProd = isProd

    const { tempPath, writeTemp } = createTemp(cliOptions.temp)
    this.tempPath = tempPath
    this.writeTemp = writeTemp

    this.vuepressDir = path.resolve(sourceDir, '.vuepress')
  }

  /**
   * Resolve user config and initialize.
   *
   * @returns {void}
   * @api private
   */

  resolveConfigAndInitialize () {
    this.siteConfig = loadConfig(this.vuepressDir)
    if (isFunction(this.siteConfig)) {
      this.siteConfig = this.siteConfig(this)
    }

    // TODO custom cwd.
    this.cwd = process.cwd()

    this.base = this.siteConfig.base || '/'
    this.themeConfig = this.siteConfig.themeConfig || {}

    const rawOutDir = this.cliOptions.dest || this.siteConfig.dest
    this.outDir = rawOutDir
      ? require('path').resolve(this.cwd, rawOutDir)
      : require('path').resolve(this.sourceDir, '.vuepress/dist')
    this.pages = [] // Array<Page>
    this.pluginAPI = new PluginAPI(this)
    this.ClientComputedMixinConstructor = ClientComputedMixin(this.getSiteData())
  }

  /**
   * Load pages, load plugins, apply plugins / plugin options, etc.
   *
   * @returns {Promise<void>}
   * @api private
   */

  async process () {
    this.resolveConfigAndInitialize()
    this.resolveCacheLoaderOptions()
    this.normalizeHeadTagUrls()
    await this.resolveTheme()
    this.resolveTemplates()
    this.resolveGlobalLayout()

    this.applyInternalPlugins()
    this.applyUserPlugins()
    this.pluginAPI.initialize()

    this.markdown = createMarkdown(this)

    await this.resolvePages()
    await this.pluginAPI.options.additionalPages.apply(this)
    await Promise.all(
      this.pluginAPI.options.additionalPages.appliedValues.map(async (options) => {
        await this.addPage(options)
      })
    )

    await this.pluginAPI.options.ready.apply()
    await Promise.all([
      this.pluginAPI.options.clientDynamicModules.apply(this),
      this.pluginAPI.options.enhanceAppFiles.apply(this),
      this.pluginAPI.options.globalUIComponents.apply(this)
    ])
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
      themeConfig.lastUpdated
      || Object.keys(siteConfig.locales && themeConfig.locales || {})
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
      .use(require('../internal-plugins/frontmatterBlock'))
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
   * Resolve options of cache loader.
   */

  resolveCacheLoaderOptions () {
    Object.assign(this, (getCacheLoaderOptions(this.siteConfig, this.cliOptions, this.cwd, this.isProd)))
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

    logger.debug('SSR Template File: ' + chalk.gray(ssrTemplate))
    logger.debug('DEV Template File: ' + chalk.gray(devTemplate))
    this.devTemplate = devTemplate
    this.ssrTemplate = ssrTemplate
  }

  /**
   * resolve global layout
   *
   * @returns {string}
   * @api private
   */

  resolveGlobalLayout () {
    const GLOBAL_LAYOUT_COMPONENT_NAME = `GlobalLayout`

    this.globalLayout = this.resolveCommonAgreementFilePath(
      'globalLayout',
      {
        defaultValue: path.resolve(__dirname, `../app/components/${GLOBAL_LAYOUT_COMPONENT_NAME}.vue`),
        siteAgreement: `components/${GLOBAL_LAYOUT_COMPONENT_NAME}.vue`,
        themeAgreement: `layouts/${GLOBAL_LAYOUT_COMPONENT_NAME}.vue`
      }
    )

    logger.debug('globalLayout: ' + chalk.gray(this.globalLayout))
  }

  /**
   * Resolve a path-type config.
   *
   * @param {string} configKey
   * @param {string} defaultValue an absolute path
   * @param {string} siteAgreement a relative path to vuepress dir
   * @param {string} themeAgreement a relative path to theme dir
   * @returns {string | void}
   */

  resolveCommonAgreementFilePath (configKey, {
    defaultValue,
    siteAgreement,
    themeAgreement
  }) {
    const siteConfigValue = this.siteConfig[configKey]
    siteAgreement = this.resolveSiteAgreementFile(siteAgreement)

    const themeConfigValue = this.getThemeConfigValue(configKey)
    themeAgreement = this.resolveThemeAgreementFile(themeAgreement)

    return fsExistsFallback([
      siteConfigValue,
      siteAgreement,
      themeConfigValue,
      themeAgreement,
      defaultValue
    ].map(v => v))
  }

  /**
   * Find all page source files located in sourceDir
   *
   * @returns {Promise<void>}
   * @api private
   */

  async resolvePages () {
    // resolve pageFiles
    const patterns = ['**/*.md', '**/*.vue', '!.vuepress', '!node_modules']
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
   * Get config value of current active theme.
   *
   * @param {string} key
   * @returns {any}
   * @api private
   */

  getThemeConfigValue (key) {
    return this.themeEntryFile[key] || this.parentThemeEntryFile[key]
  }

  /**
   * Resolve the absolute path of a theme-level agreement file,
   * return `undefined` when it doesn't exists.
   *
   * @param {string} filepath
   * @returns {string|undefined}
   */

  resolveThemeAgreementFile (filepath) {
    const current = path.resolve(this.themePath, filepath)
    if (fs.existsSync(current)) {
      return current
    }
    if (this.parentThemePath) {
      const parent = path.resolve(this.parentThemePath, filepath)
      if (fs.existsSync(parent)) {
        return parent
      }
    }
  }

  /**
   * Resolve the absolute path of a site-level agreement file,
   * return `undefined` when it doesn't exists.
   *
   * @param {string} filepath
   * @returns {string|undefined}
   */

  resolveSiteAgreementFile (filepath) {
    return path.resolve(this.vuepressDir, filepath)
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

  logger.debug(`Temp directory: ${chalk.gray(tempPath)}`)
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
