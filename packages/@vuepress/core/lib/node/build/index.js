'use strict'

const EventEmitter = require('events').EventEmitter
const webpack = require('webpack')
const readline = require('readline')
const escape = require('escape-html')

const { chalk, fs, path, logger, env, performance } = require('@vuepress/shared-utils')
const createClientConfig = require('../webpack/createClientConfig')
const createServerConfig = require('../webpack/createServerConfig')
const { createBundleRenderer } = require('vue-server-renderer')
const { normalizeHeadTag, applyUserWebpackConfig } = require('../util/index')
const { version } = require('../../../package')

/**
 * Expose Build Process Class.
 */

module.exports = class Build extends EventEmitter {
  constructor (context) {
    super()
    this.context = context
    this.maxConcurrency = this.context.options.maxConcurrency
    this.outDir = this.context.outDir
  }

  /**
   * Doing somthing before render pages, e.g. validate and empty output directory,
   * prepare webpack config.
   *
   * @returns {Promise<void>}
   * @api public
   */

  async process () {
    if (this.context.cwd === this.outDir) {
      throw new Error('Unexpected option: "outDir" cannot be set to the current working directory')
    }

    this.context.resolveCacheLoaderOptions()
    await fs.emptyDir(this.outDir)
    logger.debug('Dist directory: ' + chalk.gray(this.outDir))
    this.prepareWebpackConfig()
  }

  /**
   * Compile and render pages.
   *
   * @returns {Promise<void>}
   * @api public
   */

  async render () {
    // compile!
    const stats = await compile([this.clientConfig, this.serverConfig])
    const serverBundle = require(path.resolve(this.outDir, 'manifest/server.json'))
    const clientManifest = require(path.resolve(this.outDir, 'manifest/client.json'))

    // remove manifests after loading them.
    await fs.remove(path.resolve(this.outDir, 'manifest'))

    // ref: https://github.com/vuejs/vuepress/issues/1367
    if (!this.clientConfig.devtool && (!this.clientConfig.plugins
      || !this.clientConfig.plugins.some(p =>
        p instanceof webpack.SourceMapDevToolPlugin
        || p instanceof webpack.EvalSourceMapDevToolPlugin
      ))) {
      await workaroundEmptyStyleChunk(stats, this.outDir)
    }

    // create server renderer using built manifests
    this.renderer = createBundleRenderer(serverBundle, {
      clientManifest,
      runInNewContext: false,
      inject: false,
      shouldPrefetch: this.context.siteConfig.shouldPrefetch || (() => true),
      template: await fs.readFile(this.context.ssrTemplate, 'utf-8')
    })

    // pre-render head tags from user config
    // filter out meta tags for they will be injected in updateMeta.js
    this.userHeadTags = (this.context.siteConfig.head || [])
      .filter(([headTagType]) => headTagType !== 'meta')
      .map(renderHeadTag)
      .join('\n    ')

    // if the user does not have a custom 404.md, generate the theme's default
    if (!this.context.pages.some(p => p.path === '/404.html')) {
      await this.context.addPage({ path: '/404.html' })
    }

    // render pages
    logger.wait('Rendering static HTML...')

    // If maxConcurrency is set, instead of rendering all pages concurrently,
    // build task would render pages by smaller group to prevent OOM.
    if (this.maxConcurrency) logger.info(`max concurrency set: ${this.maxConcurrency}`)
    const pagePaths = []
    const maxConcurrency = this.maxConcurrency || 100000
    for (let i = 0; i < this.context.pages.length; i += maxConcurrency) {
      const segmentPaths = await Promise.all(
        this.context.pages.slice(i, i + maxConcurrency)
        .map(page => this.renderPage(page))
      )
      pagePaths.push(...segmentPaths)
    }

    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)

    await this.context.pluginAPI.applyAsyncOption('generated', pagePaths)

    // DONE.
    const relativeDir = path.relative(this.context.cwd, this.outDir)
    logger.success(`Generated static files in ${chalk.cyan(relativeDir)}.`)
    const { duration } = performance.stop()
    logger.developer(`It took a total of ${chalk.cyan(`${duration}ms`)} to run the ${chalk.cyan('vuepress build')}.`)
    console.log()
  }

  /**
   * Prepare webpack config under build.
   *
   * @api private
   */

  prepareWebpackConfig () {
    this.clientConfig = createClientConfig(this.context).toConfig()
    this.serverConfig = createServerConfig(this.context).toConfig()

    const userConfig = this.context.siteConfig.configureWebpack
    if (userConfig) {
      this.clientConfig = applyUserWebpackConfig(userConfig, this.clientConfig, false)
      this.serverConfig = applyUserWebpackConfig(userConfig, this.serverConfig, true)
    }
  }

  /**
   * Render page
   *
   * @param {Page} page
   * @returns {Promise<string>}
   * @api private
   */

  async renderPage (page) {
    const pagePath = decodeURIComponent(page.path)

    const context = {
      url: page.path,
      userHeadTags: this.userHeadTags,
      title: 'VuePress',
      lang: 'en',
      description: '',
      version
    }

    let html
    try {
      html = await this.renderer.renderToString(context)
    } catch (e) {
      console.error(logger.error(chalk.red(`Error rendering ${pagePath}:`), false))
      throw e
    }
    const filename = pagePath.replace(/\/$/, '/index.html').replace(/^\//, '')
    const filePath = path.resolve(this.outDir, filename)
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, html)
    return filePath
  }
}

/**
 * Compile a webpack application and return stats json.
 *
 * @param {Object} config
 * @returns {Promise<Object>}
 */

function compile (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        stats.toJson().errors.forEach(err => {
          console.error(err)
        })
        reject(new Error(`Failed to compile with errors.`))
        return
      }
      if (env.isDebug && stats.hasWarnings()) {
        stats.toJson().warnings.forEach(warning => {
          console.warn(warning)
        })
      }
      resolve(stats.toJson({ modules: false }))
    })
  })
}

/**
 * Render head tag
 *
 * @param {Object} tag
 * @returns {string}
 */

function renderHeadTag (tag) {
  const { tagName, attributes, innerHTML, closeTag } = normalizeHeadTag(tag)
  return `<${tagName}${renderAttrs(attributes)}>${innerHTML}${closeTag ? `</${tagName}>` : ``}`
}

/**
 * Render html attributes
 *
 * @param {Object} attrs
 * @returns {string}
 */

function renderAttrs (attrs = {}) {
  const keys = Object.keys(attrs)
  if (keys.length) {
    return ' ' + keys.map(name => `${name}="${escape(attrs[name])}"`).join(' ')
  } else {
    return ''
  }
}

/**
 * find and remove empty style chunk caused by
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
 * TODO remove when it's fixed
 *
 * @param {Object} stats
 * @param {String} outDir
 * @returns {Promise<void>}
 */

async function workaroundEmptyStyleChunk (stats, outDir) {
  const styleChunk = stats.children[0].assets.find(a => {
    return /styles\.\w{8}\.js$/.test(a.name)
  })
  if (!styleChunk) return
  const styleChunkPath = path.resolve(outDir, styleChunk.name)
  const styleChunkContent = await fs.readFile(styleChunkPath, 'utf-8')
  await fs.remove(styleChunkPath)
  // prepend it to app.js.
  // this is necessary for the webpack runtime to work properly.
  const appChunk = stats.children[0].assets.find(a => {
    return /app\.\w{8}\.js$/.test(a.name)
  })
  const appChunkPath = path.resolve(outDir, appChunk.name)
  const appChunkContent = await fs.readFile(appChunkPath, 'utf-8')
  await fs.writeFile(appChunkPath, styleChunkContent + appChunkContent)
}
