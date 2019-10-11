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
const PluginAPI = require('./plugin-api')
const DevProcess = require('./dev')
const BuildProcess = require('./build')
const createTemp = require('./createTemp')

/**
 * Expose VuePressApp.
 */

module.exports = class App {
  /**
   * Instantiate the app context with a new API
   *
   * @param {string} sourceDir
   * @param {{
   *  plugins: pluginsConfig,
   *  theme: themeNameConfig
   *  temp: string
   * }} options
   */

  constructor (options = {}) {
    this.options = options
    this.sourceDir = this.options.sourceDir || path.join(__dirname, 'docs.fallback')
    logger.debug('sourceDir', this.sourceDir)
    if (!fs.existsSync(this.sourceDir)) {
      logger.warn(`Source directory doesn't exist: ${chalk.yellow(this.sourceDir)}`)
    }

    const { tempPath, writeTemp } = createTemp(options.temp)
    this.tempPath = tempPath
    this.writeTemp = writeTemp

    this.vuepressDir = path.resolve(this.sourceDir, '.vuepress')
    this.libDir = path.join(__dirname, '../')
  }

  /**
   * Resolve user config and initialize.
   *
   * @returns {Promise<void>}
   * @api private
   */

  async resolveConfigAndInitialize () {
    if (this.options.siteConfig) {
      this.siteConfig = this.options.siteConfig
    } else {
      let siteConfig = loadConfig(this.vuepressDir)
      if (isFunction(siteConfig)) {
        siteConfig = await siteConfig(this)
      }
      this.siteConfig = siteConfig
    }

    // TODO custom cwd.
    this.cwd = process.cwd()

    this.base = this.siteConfig.base || '/'
    this.themeConfig = this.siteConfig.themeConfig || {}

    const rawOutDir = this.options.dest || this.siteConfig.dest
    this.outDir = rawOutDir
      ? require('path').resolve(this.cwd, rawOutDir)
      : require('path').resolve(this.sourceDir, '.vuepress/dist')
    this.pages = [] // Array<Page>
    this.pluginAPI = new PluginAPI(this)
    this.ClientComputedMixinConstructor = ClientComputedMixin(this.getSiteData())
  }

  /**
   * A asynchronous method used to prepare the context of the current app. which
   * contains loading pages and plugins, apply plugins, etc.
   *
   * @returns {Promise<void>}
   * @api private
   */

  async process () {
    await this.resolveConfigAndInitialize()
    this.normalizeHeadTagUrls()
    this.themeAPI = loadTheme(this)
    this.resolveTemplates()
    this.resolveGlobalLayout()

    this.applyInternalPlugins()
    this.applyUserPlugins()
    this.pluginAPI.initialize()

    this.markdown = createMarkdown(this)

    await this.resolvePages()

    await this.pluginAPI.applyAsyncOption('additionalPages', this)
    await Promise.all(
      this.pluginAPI.getOption('additionalPages').appliedValues.map(async (options) => {
        await this.addPage(options)
      })
    )
    await this.pluginAPI.applyAsyncOption('ready')
    await Promise.all([
      this.pluginAPI.applyAsyncOption('clientDynamicModules', this),
      this.pluginAPI.applyAsyncOption('enhanceAppFiles', this),
      this.pluginAPI.applyAsyncOption('globalUIComponents', this)
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
      .use(require('./internal-plugins/siteData'))
      .use(require('./internal-plugins/routes'))
      .use(require('./internal-plugins/rootMixins'))
      .use(require('./internal-plugins/enhanceApp'))
      .use(require('./internal-plugins/palette'))
      .use(require('./internal-plugins/style'))
      .use(require('./internal-plugins/layoutComponents'))
      .use(require('./internal-plugins/pageComponents'))
      .use(require('./internal-plugins/transformModule'))
      .use(require('./internal-plugins/dataBlock'))
      .use(require('./internal-plugins/frontmatterBlock'))
      .use('container', {
        type: 'slot',
        before: info => `<template #${info}>`,
        after: '</template>'
      })
      .use('container', {
        type: 'v-pre',
        before: '<div v-pre>',
        after: '</div>'
      })
      .use('@vuepress/last-updated', !!shouldUseLastUpdated)
      .use('@vuepress/register-components', {
        componentsDir: [
          path.resolve(this.sourceDir, '.vuepress/components'),
          path.resolve(this.themeAPI.theme.path, 'global-components'),
          this.themeAPI.existsParentTheme && path.resolve(this.themeAPI.parentTheme.path, 'global-components')
        ]
      })
  }

  /**
   * Apply user plugins
   *
   * @api private
   */

  applyUserPlugins () {
    this.pluginAPI.useByPluginsConfig(this.options.plugins)
    if (this.themeAPI.existsParentTheme) {
      this.pluginAPI.use(this.themeAPI.parentTheme.entry)
    }
    this.pluginAPI
      .use(this.themeAPI.theme.entry)
      .use(this.themeAPI.vuepressPlugin)
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
    Object.assign(this, (getCacheLoaderOptions(this.siteConfig, this.options, this.cwd, this.isProd)))
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
    this.devTemplate = this.resolveCommonAgreementFilePath(
      'devTemplate',
      {
        defaultValue: this.getLibFilePath('client/index.dev.html'),
        siteAgreement: 'templates/dev.html',
        themeAgreement: 'templates/dev.html'
      }
    )

    this.ssrTemplate = this.resolveCommonAgreementFilePath(
      'ssrTemplate',
      {
        defaultValue: this.getLibFilePath('client/index.ssr.html'),
        siteAgreement: 'templates/ssr.html',
        themeAgreement: 'templates/ssr.html'
      }
    )

    logger.debug('SSR Template File: ' + chalk.gray(this.ssrTemplate))
    logger.debug('DEV Template File: ' + chalk.gray(this.devTemplate))
  }

  /**
   * resolve global layout
   *
   * @returns {string}
   * @api private
   */

  resolveGlobalLayout () {
    this.globalLayout = this.resolveCommonAgreementFilePath(
      'globalLayout',
      {
        defaultValue: this.getLibFilePath('client/components/GlobalLayout.vue'),
        siteAgreement: `components/GlobalLayout.vue`,
        themeAgreement: `layouts/GlobalLayout.vue`
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
    const patterns = this.siteConfig.patterns ? this.siteConfig.patterns : ['**/*.md', '**/*.vue']
    patterns.push('!.vuepress', '!node_modules')

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
      enhancers: this.pluginAPI.getOption('extendPageData').items
    })
    const index = this.pages.findIndex(({ path }) => path === page.path)
    if (index >= 0) {
      // Override a page if corresponding path already exists
      logger.warn(`Override existing page ${chalk.yellow(page.path)}.`)
      this.pages.splice(index, 1, page)
    } else {
      this.pages.push(page)
    }
  }

  /**
   * Get config value of current active theme.
   *
   * @param {string} key
   * @returns {any}
   * @api private
   */

  getThemeConfigValue (key) {
    return this.themeAPI.theme.entry[key]
      || this.themeAPI.existsParentTheme && this.themeAPI.parentTheme.entry[key]
  }

  /**
   * Resolve the absolute path of a theme-level agreement file,
   * return `undefined` when it doesn't exists.
   *
   * @param {string} filepath
   * @returns {string|undefined}
   */

  resolveThemeAgreementFile (filepath) {
    const current = path.resolve(this.themeAPI.theme.path, filepath)
    if (fs.existsSync(current)) {
      return current
    }
    if (this.themeAPI.existsParentTheme) {
      const parent = path.resolve(this.themeAPI.parentTheme.path, filepath)
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

  /**
   * Get file path in core lib
   *
   * @param relative
   * @returns {string}
   * @api public
   */

  getLibFilePath (relative) {
    return path.join(this.libDir, relative)
  }

  /**
   * Launch a dev process with current app context.
   *
   * @returns {Promise<App>}
   * @api public
   */

  async dev () {
    this.isProd = false
    this.devProcess = new DevProcess(this)
    await this.devProcess.process()
    const error = await new Promise(resolve => {
      try {
        this.devProcess
            .on('fileChanged', ({ type, target }) => {
              console.log(`Reload due to ${chalk.red(type)} ${chalk.cyan(path.relative(this.sourceDir, target))}`)
              this.process()
            })
            .createServer()
            .listen(resolve)
      } catch (err) {
        resolve(err)
      }
    })
    if (error) {
      throw error
    }
    return this
  }

  /**
   * Launch a build process with current app context
   *
   * @returns {Promise<App>}
   * @api public
   */

  async build () {
    this.isProd = true
    this.buildProcess = new BuildProcess(this)
    await this.buildProcess.process()
    await this.buildProcess.render()
    return this
  }
}

