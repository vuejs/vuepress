const { parentPort } = require('worker_threads')
const escape = require('escape-html')
const { chalk, fs, path, logger } = require('@vuepress/shared-utils')
const { createBundleRenderer } = require('vue-server-renderer')
const { normalizeHeadTag } = require('../util/index')
const { version } = require('../../../package')

/**
 * Worker file for HTML page rendering
 *
 * @param {number} workerNumber
 * @param {Array<Page>} pages
 * @returns {Promise<string>}
 * @api private
 */

parentPort.once('message', async payload => {
  logger.setOptions({ logLevel: payload.logLevel })
  const siteConfig = JSON.parse(payload.siteConfig)
  const ssrTemplate = JSON.parse(payload.ssrTemplate)

  // create server renderer using built manifests
  const renderer = createBundleRenderer(JSON.parse(payload.serverBundle), {
    clientManifest: JSON.parse(payload.clientManifest),
    runInNewContext: false,
    inject: false,
    shouldPrefetch: siteConfig.shouldPrefetch || (() => true),
    template: await fs.readFile(ssrTemplate, 'utf-8')
  })

  // pre-render head tags from user config
  const userHeadTags = (siteConfig.head || []).map(renderHeadTag).join('\n  ')

  const pages = JSON.parse(Buffer.from(payload.pages))
  logger.wait(`Worker #${payload.workerNumber} beginning rendering of ${pages.length} pages`)
  const filePaths = []
  let pagesRendered = 0

  for (const page of pages) {
    const pagePath = decodeURIComponent(page.path)

    // #565 Avoid duplicate description meta at SSR.
    const meta = ((page.frontmatter && page.frontmatter.meta) || []).filter(
      item => item.name !== 'description'
    )
    const pageMeta = renderPageMeta(meta)

    const context = {
      url: page.path,
      userHeadTags: userHeadTags,
      pageMeta,
      title: 'VuePress',
      lang: 'en',
      description: '',
      version
    }

    let html
    try {
      html = await renderer.renderToString(context)
    } catch (e) {
      console.error(
        logger.error(
          chalk.red(
            `Worker #${payload.workerNumber} error rendering ${pagePath}:`
          ),
          false
        )
      )
      throw e
    } finally {
      const filename = pagePath
        .replace(/\/$/, '/index.html')
        .replace(/^\//, '')
      const filePath = path.resolve(payload.outDir, filename)
      await fs.ensureDir(path.dirname(filePath))
      await fs.writeFile(filePath, html)
      filePaths.push(filePath)
      pagesRendered++

      if (pagesRendered % 50 === 0) {
        parentPort.postMessage({
          complete: false,
          message: `Worker #${payload.workerNumber} has rendered ${pagesRendered} of ${pages.length} pages`,
          filePaths: null
        })
      }
    }
  }
  parentPort.postMessage({
    complete: true,
    message: `Worker #${payload.workerNumber} has rendered ${pagesRendered} of ${pages.length} pages`,
    filePaths: filePaths
  })
})

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
 * Render head tag
 *
 * @param {Object} tag
 * @returns {string}
 */

function renderHeadTag (tag) {
  const { tagName, attributes, innerHTML, closeTag } = normalizeHeadTag(tag)
  return `<${tagName}${renderAttrs(attributes)}>${innerHTML}${
    closeTag ? `</${tagName}>` : ``
  }`
}

/**
 * Render meta tags
 *
 * @param {Array} meta
 * @returns {Array<string>}
 */

function renderPageMeta (meta) {
  if (!meta) return ''
  return meta
    .map(m => {
      let res = `<meta`
      Object.keys(m).forEach(key => {
        res += ` ${key}="${escape(m[key])}"`
      })
      return res + `>`
    })
    .join('')
}
