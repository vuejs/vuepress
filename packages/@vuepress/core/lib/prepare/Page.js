'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const slugify = require('../markdown/slugify')
const { inferTitle, extractHeaders } = require('../util/index')
const { fs, fileToPath, parseFrontmatter, getPermalink } = require('@vuepress/shared-utils')

/**
 * Expose Page class.
 */

module.exports = class Page {
  /**
   * @param {string} path the URL (excluding the domain name) for your page/post.
   * @param {string} title markdown title
   * @param {string} content markdown file content
   * @param {string} filePath absolute file path of source markdown file.
   * @param {string} relative relative file path of source markdown file.
   * @param {string} permalink same to path, the URL (excluding the domain name) for your page/post.
   * @param {object} frontmatter
   * @param {string} permalinkPattern
   */
  constructor ({
    path,
    meta,
    title,
    content,
    filePath,
    relative,
    permalink,
    frontmatter = {},
    permalinkPattern
  }) {
    this.title = title
    this._meta = meta
    this._filePath = filePath
    this._content = content
    this._permalink = permalink
    this.frontmatter = frontmatter

    if (relative) {
      this._routePath = encodeURI(fileToPath(relative))
    } else if (path) {
      this._routePath = encodeURI(path)
    } else if (permalink) {
      this._routePath = encodeURI(permalink)
    }

    this.key = 'v-' + Math.random().toString(16).slice(2)
    this.regularPath = this.path = this._routePath
    this._permalinkPattern = permalinkPattern
  }

  /**
   * Process a page.
   *
   *   1. If it's a page pointing to a md file, this method will try
   *      to resolve the page's title / headers from the content.
   *   2. If it's a pure route. this method will only enhance it.
   *
   * @api public
   */

  async process ({
    i18n,
    markdown,
    enhancers
  }) {
    if (this._filePath) {
      this._content = await fs.readFile(this._filePath, 'utf-8')
    }

    if (this._content) {
      const { excerpt, data, content } = parseFrontmatter(this._content)
      this._strippedContent = content
      this.frontmatter = data

      // infer title
      const title = inferTitle(this.frontmatter, this._strippedContent)
      if (title) {
        this.title = title
      }

      // headers
      const headers = extractHeaders(
        this._strippedContent,
        ['h2', 'h3'],
        markdown
      )
      if (headers.length) {
        this.headers = headers
      }

      if (excerpt) {
        const { html } = markdown.render(excerpt)
        this.excerpt = html
      }
    }

    // resolve i18n
    i18n.setSSRContext(this)
    this._i18n = i18n
    this._localePath = i18n.$localePath

    this.enhance(enhancers)
    this.buildPermalink()
  }

  /**
   * file name of page's source markdown file, or the last cut of regularPath.
   *
   * @returns {string}
   * @api public
   */

  get filename () {
    return path.parse(this._filePath || this.regularPath).name
  }

  /**
   * slugified file name.
   *
   * @returns {string}
   * @api public
   */

  get slug () {
    return slugify(this.filename)
  }

  /**
   * Convert page's metadata to JSON, note that all fields beginning
   * with an underscore will not be serialized.
   *
   * @returns {object}
   * @api public
   */

  toJson () {
    const json = {}
    Object.keys(this).reduce((json, key) => {
      if (!key.startsWith('_')) {
        json[key] = this[key]
      }
      return json
    }, json)
    return json
  }

  /**
   * Build permalink via permalink pattern and page's metadata.
   *
   * @api private
   */

  buildPermalink () {
    if (!this._permalink) {
      this._permalink = getPermalink({
        pattern: this.frontmatter.permalink || this._permalinkPattern,
        slug: this.slug,
        date: this.frontmatter.date,
        localePath: this._localePath,
        regularPath: this.regularPath
      })
    }

    if (this._permalink) {
      this.path = this._permalink
    }
  }

  /**
   * Execute the page enhancers. A enhancer could do following things:
   *
   *   1. Modify page's frontmetter.
   *   2. Add extra field to the page.
   *
   * @api private
   */

  enhance (enhancers) {
    for (const { name: pluginName, value: enhancer } of enhancers) {
      try {
        enhancer(this)
      } catch (error) {
        console.log(error)
        throw new Error(`[${pluginName}] excuete extendPageData failed.`)
      }
    }
  }
}
