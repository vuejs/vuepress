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
const pLimit = require('p-limit')

/**
 * Expose Build Process Class.
 */

module.exports = class Build extends EventEmitter {
  constructor (context) {
    super()
    this.context = context
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
    console.log()

    // Keep track of progress
    const total = this.context.pages.length
    this.counter = 0
    this.active = 0
    const RENDER_LIMIT = 50

    // start with empty progress bar
    console.log()
    renderProgress(this.counter, total, RENDER_LIMIT - 1, `Rendering ${total} pages`)

    // Use p-limit to throttle number of files done at the same time
    const limit = pLimit(RENDER_LIMIT)
    const pagePaths = await Promise.all(
      this.context.pages.map(page => limit(() => this.renderPage(page, total)))
    )

    // Wipe progress bar
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
   * @param {Number} total total number of static pages we're rendering
   * @returns {Promise<string>}
   * @api private
   */

  async renderPage (page, total) {
    const pagePath = decodeURIComponent(page.path)

    const context = {
      url: page.path,
      userHeadTags: this.userHeadTags,
      title: 'VuePress',
      lang: 'en',
      description: '',
      version
    }

    this.active++
    const filename = pagePath.replace(/\/$/, '/index.html').replace(/^\//, '')
    const filePath = path.resolve(this.outDir, filename)
    try {
      const readable = this.renderer.renderToStream(context)
      await fs.ensureDir(path.dirname(filePath))
      await pipe(filePath, readable)
    } catch (e) {
      console.error(logger.error(chalk.red(`Error rendering ${pagePath}:`), false))
      throw e
    } finally {
      this.counter++
      this.active--
    }
    renderProgress(this.counter, total, this.active, pagePath)
    return filePath
  }
}

const BAR_LENGTH = 50
const BAR_BG = chalk.white('█')
const BAR_FG = chalk.blueBright('█')
/**
 * Renders a progres sbar of static html pages, like this:
 *
 * ██████████████████████████████████████████████████ (44%) 721/1618 files, 50 active
 * ...cations/Managing_Non-Titanium_Client_Applications_in_Dashboard.html
 *
 * @param {Number} count current count of files done
 * @param {Number} total total number of files to process
 * @param {Number} active number of files being actively processed
 * @param {string} filename last file finished
 */
function renderProgress (count, total, active, filename) {
  const progress = count / total // as a [0.0, 1.0] float
  const blocks = Math.floor(progress * BAR_LENGTH)

  readline.moveCursor(process.stdout, 0, -1) // move up to
  readline.cursorTo(process.stdout, 0) // start at beginning of line
  readline.clearScreenDown(process.stdout) // clear everything below

  const bar = BAR_FG.repeat(blocks) + BAR_BG.repeat(BAR_LENGTH - blocks)
  const percent = Math.floor(progress * 100) // as a 0-100 integer
  const totals = chalk.gray(`${count}/${total} files, ${active + 1} active`)
  console.log(`${bar} (${percent}%) ${totals}`) // print the bar, progress
  const shortFilename = filename.length > 70 ? `...${filename.slice(-67)}` : filename
  process.stdout.write(`${chalk.gray(shortFilename)}`) // print the filename
}

/**
 * Pipes rendered static HTML to a file
 *
 * @param {string} filePath
 * @param {Stream.Readable} readable
 * @returns {Promise<void>}
 */
function pipe (filePath, readable) {
  return new Promise((resolve, reject) => {
    const outStream = fs.createWriteStream(filePath)
    readable.pipe(outStream)
    outStream.on('finish', resolve(filePath))
    readable.on('error', reject)
  })
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
