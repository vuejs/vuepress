`use strict`

const EventEmitter = require('events').EventEmitter
const webpack = require('webpack')
const readline = require('readline')
const { Worker } = require('worker_threads')

const {
  chalk,
  fs,
  path,
  logger,
  env,
  performance
} = require('@vuepress/shared-utils')
const createClientConfig = require('../webpack/createClientConfig')
const createServerConfig = require('../webpack/createServerConfig')
const { applyUserWebpackConfig } = require('../util/index')

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
      throw new Error(
        'Unexpected option: "outDir" cannot be set to the current working directory'
      )
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
    performance.start()
    const stats = await compile([this.clientConfig, this.serverConfig])
    const serverBundle = require(path.resolve(
      this.outDir,
      'manifest/server.json'
    ))
    const clientManifest = require(path.resolve(
      this.outDir,
      'manifest/client.json'
    ))

    // remove manifests after loading them.
    await fs.remove(path.resolve(this.outDir, 'manifest'))

    // ref: https://github.com/vuejs/vuepress/issues/1367
    if (
      !this.clientConfig.devtool
      && (!this.clientConfig.plugins
        || !this.clientConfig.plugins.some(
          p =>
            p instanceof webpack.SourceMapDevToolPlugin
            || p instanceof webpack.EvalSourceMapDevToolPlugin
        ))
    ) {
      await workaroundEmptyStyleChunk(stats, this.outDir)
    }

    // if the user does not have a custom 404.md, generate the theme's default
    if (!this.context.pages.some(p => p.path === '/404.html')) {
      this.context.addPage({ path: '/404.html' })
    }

    // render pages
    logger.wait('Rendering static HTML...')

    let activeWorkers = 0
    const pagePaths = []
    const pagesPerThread = this.context.pages.length / env.workerThreads

    for (let workerNumber = 0; workerNumber < env.workerThreads; workerNumber++) {
      const startIndex = workerNumber * pagesPerThread
      const pageData = this.context.pages.slice(
        startIndex,
        startIndex + pagesPerThread
      )
      const pages = pageData.map(p => ({
        path: p.path,
        frontmatter: JSON.stringify(p.frontmatter)
      }))

      const payload = {
        clientManifest: JSON.stringify(clientManifest),
        outDir: this.outDir,
        pages: Buffer.from(JSON.stringify(pages)),
        serverBundle: JSON.stringify(serverBundle),
        siteConfig: JSON.stringify(this.context.siteConfig),
        ssrTemplate: JSON.stringify(this.context.ssrTemplate),
        workerNumber,
        logLevel: logger.options.logLevel
      }

      const worker = new Worker(path.join(__dirname, './worker.js'))
      worker.postMessage(payload)
      activeWorkers++
      worker.on('message', response => {
        if (response.complete) {
          pagePaths.concat(response.filePaths)
        }
        if (response.message) {
          logger.wait(response.message)
        }
      })
      worker.on('error', error => {
        // readline.cursorTo(process.stdout, 0, i)
        // readline.clearLine(process.stdout, 0)
        console.error(
          logger.error(
            chalk.red(`Worker #${workerNumber} sent error: ${error}\n\n${error.stack}`),
            false
          )
        )
      })
      worker.on('exit', code => {
        activeWorkers--
        // readline.cursorTo(process.stdout, 0, i)
        // readline.clearLine(process.stdout, 0)
        if (code === 0) {
          logger.success(`Worker ${workerNumber} completed successfully.`)
        } else {
          logger.error(
            chalk.red(`Worker #${workerNumber} sent exit code: ${code}`),
            false
          )
        }
        if (activeWorkers === 0) {
          // DONE.
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          const relativeDir = path.relative(this.context.cwd, this.outDir)
          logger.success(
            `Generated static files in ${chalk.cyan(relativeDir)}.`
          )
          const { duration } = performance.stop()
          logger.success(
            `It took a total of ${chalk.cyan(
              `${duration}ms`
            )} to run the ${chalk.cyan('vuepress build')}.`
          )
          console.log()
        }
      })
    }

    await this.context.pluginAPI.applyAsyncOption('generated', pagePaths)
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
      this.clientConfig = applyUserWebpackConfig(
        userConfig,
        this.clientConfig,
        false
      )
      this.serverConfig = applyUserWebpackConfig(
        userConfig,
        this.serverConfig,
        true
      )
    }
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
