module.exports = async function build (sourceDir) {
  process.env.NODE_ENV = 'production'

  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const { promisify } = require('util')
  const rimraf = promisify(require('rimraf'))
  const mkdirp = promisify(require('mkdirp'))
  const writeFile = promisify(fs.writeFile)

  const prepare = require('./prepare')
  const createClientConfig = require('./webpack/clientConfig')
  const createServerConfig = require('./webpack/serverConfig')
  const { createBundleRenderer } = require('vue-server-renderer')

  const options = await prepare(sourceDir)

  const targetDir = path.resolve(sourceDir, '_dist')
  await rimraf(targetDir)

  const clientConfig = createClientConfig(options).toConfig()
  const serverConfig = createServerConfig(options).toConfig()

  // compile!
  await compile([clientConfig, serverConfig])

  const serverBundle = require(path.resolve(targetDir, 'manifest/server.json'))
  const clientManifest = require(path.resolve(targetDir, 'manifest/client.json'))

  // remove manifests after loading them.
  await rimraf(path.resolve(targetDir, 'manifest'))

  const renderer = createBundleRenderer(serverBundle, {
    clientManifest,
    runInNewContext: false,
    shouldPrefetch: () => false,
    inject: false,
    template: fs.readFileSync(path.resolve(__dirname, 'app/index.ssr.html'), 'utf-8')
  })

  const userHeadTags = (options.siteConfig.head || [])
    .map(renderHeadTag)
    .join('\n  ')

  await Promise.all(options.siteData.pages.map(async (page) => {
    const context = {
      url: page.path,
      userHeadTags,
      title: 'VuePress',
      lang: 'en'
    }

    let html
    try {
      html = await renderer.renderToString(context)
    } catch (e) {
      console.error(chalk.red(`Error rendering ${page.path}:`))
      console.error(e.stack)
      return
    }
    const filename = page.path === '/' ? 'index.html' : page.path.replace(/^\//, '')
    const filePath = path.resolve(targetDir, filename)
    await mkdirp(path.dirname(filePath))
    await writeFile(filePath, html)
  }))

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
        resolve()
      })
    })
  }

  function renderHeadTag (t) {
    return `<${t.tag}${renderAttrs(t.attributes)}>${
      t.innerHTML || ''
    }${needsClosing(t.tag) ? `</${t.tag}>` : ``}`
  }

  function needsClosing (tag) {
    return !(tag === 'link' || tag === 'meta')
  }

  function renderAttrs (attrs = {}) {
    const keys = Object.keys(attrs)
    if (keys.length) {
      return ' ' + keys.map(name => `${name}="${attrs[name]}"`).join(' ')
    } else {
      return ''
    }
  }
}
