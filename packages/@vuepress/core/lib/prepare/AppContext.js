const path = require('path')
const createMarkdown = require('../markdown/index')
const loadConfig = require('./loadConfig')
const loadTheme = require('./loadTheme')
const { fs, logger, chalk, globby, sort } = require('@vuepress/shared-utils')

const Page = require('./Page')
const I18n = require('./I18n')
const PluginAPI = require('../plugin-api/index')

module.exports = class AppContext {
  /**
   * Instantiate the app context with a new API
   * @param { string } sourceDir
   * @param {{
   *  isProd: boolean,
   *  plugins: pluginsConfig,
   *  theme: themeNameConfig
   *  temp: string
   * }} options
   */
  constructor (sourceDir, options) {
    this.sourceDir = sourceDir
    this._options = options
    this.isProd = options.isProd

    const { tempPath, writeTemp } = createTemp(options.temp)
    this.tempPath = tempPath
    this.writeTemp = writeTemp

    this.vuepressDir = path.resolve(sourceDir, '.vuepress')
    this.siteConfig = loadConfig(this.vuepressDir)
    this.base = this.siteConfig.base || '/'
    this.themeConfig = this.siteConfig.themeConfig || {}
    this.outDir = this.siteConfig.dest
      ? path.resolve(this.siteConfig.dest)
      : path.resolve(sourceDir, '.vuepress/dist')

    this.markdown = createMarkdown(this.siteConfig)
    this.pluginAPI = new PluginAPI(this)
    this.pages = [] // Array<Page>
    this.I18nConstructor = I18n(null)
  }

  /**
   * Load pages, load plugins, apply plugins / plugin options, etc.
   * @returns {Promise<void>}
   */
  async process () {
    this.normalizeHeadTagUrls()
    await this.resolveTheme()
    this.resolvePlugins()

    await this.resolvePages()
    await Promise.all(
      this.pluginAPI.options.additionalPages.values.map(async ({ path, permalink }) => {
        await this.addPage(path, { permalink })
      })
    )

    await this.pluginAPI.options.ready.apply()
    this.pluginAPI.options.extendMarkdown.syncApply(this.markdown)
    await this.pluginAPI.options.clientDynamicModules.apply(this)
    await this.pluginAPI.options.globalUIComponents.apply(this)
    await this.pluginAPI.options.enhanceAppFiles.apply(this)
  }

  /**
   * Apply internal and user plugins
   */
  resolvePlugins () {
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
      .use(require('../internal-plugins/importAsyncComponent'))
      .use(require('../internal-plugins/enhanceApp'))
      .use(require('../internal-plugins/overrideCSS'))
      .use(require('../internal-plugins/i18nTemp'))
      .use(require('../internal-plugins/layouts'))
      // user plugin
      .useByPluginsConfig(this._options.plugins)
      .useByPluginsConfig(this.siteConfig.plugins)
      .useByPluginsConfig(this.themePlugins)
      // built-in plugins
      .use('@vuepress/last-updated', shouldUseLastUpdated)
      .use('@vuepress/register-components', {
        componentsDir: [
          path.resolve(this.sourceDir, '.vuepress/components'),
          path.resolve(this.themePath, 'components')
        ]
      })
      .apply()
  }

  /**
   * normalize head tag urls for base
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
   * Find all page source files located in sourceDir
   * @returns {Promise<void>}
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
      await this.addPage(filePath, { relative })
    }))
  }

  /**
   * Add a page
   * @param { string } filePath
   * @param { string } relative relative path of source markdown file.
   * @param { string } permalink the URL (excluding the domain name)
   *                   for your pages, posts.
   * @returns { Promise<void> }
   */
  async addPage (filePath, { relative, permalink }) {
    const page = new Page(filePath, {
      relative,
      permalink,
      permalinkPattern: this.siteConfig.permalink
    })
    await page.process(
      this.markdown,
      new this.I18nConstructor((this.getSiteData.bind(this))),
      this.pluginAPI.options.extendPageData.items
    )
    this.pages.push(page)
  }

  /**
   * Resolve theme
   * @returns { Promise<void> }
   */
  async resolveTheme () {
    const theme = this.siteConfig.theme || this._options.theme
    Object.assign(this, (await loadTheme(theme, this.sourceDir, this.vuepressDir)))
  }

  /**
   * Get the data to be delivered to the client.
   * @returns {{
   *  title: string,
   *  description: string,
   *  base: string,
   *  pages: Page[],
   *  themeConfig: ThemeConfig,
   *  locales: Locales
   * }}
   */
  getSiteData () {
    console.log('2')
    return {
      title: this.siteConfig.title || '',
      description: this.siteConfig.description || '',
      base: this.base,
      pages: this.pages.map(page => page.toJson()),
      themeConfig: this.siteConfig.themeConfig || {},
      locales: this.siteConfig.locales
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
  }

  logger.tip(`Temp directory: ${chalk.gray(tempPath)}`)
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
