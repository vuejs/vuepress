'use strict'

/**
 * Module dependencies.
 */

const { inferDate, DATE_RE } = require('../util/index')
const { extractHeaders, fs, path, fileToPath, parseFrontmatter, getPermalink, inferTitle, slugify } = require('@vuepress/shared-utils')

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
    this._permalinkPattern = permalinkPattern

    if (relative) {
      this.regularPath = encodeURI(fileToPath(relative))
    } else if (path) {
      this.regularPath = encodeURI(path)
    } else if (permalink) {
      this.regularPath = encodeURI(permalink)
    }

    this.key = 'v-' + Math.random().toString(16).slice(2)
    // Using regularPath first, would be override by permalink later.
    this.path = this.regularPath
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
    computed,
    markdown,
    enhancers = []
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
    computed.setPage(this)
    this._computed = computed
    this._localePath = computed.$localePath

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
    return slugify(this.strippedFilename)
  }

  /**
   * stripped file name.
   *
   * If filename was yyyy-MM-dd-[title], the date prefix will be stripped.
   * If filename was yyyy-MM-[title], the date prefix will be stripped.
   *
   * @returns {string}
   * @api public
   */

  get strippedFilename () {
    const match = this.filename.match(DATE_RE)
    return match ? match[3] : this.filename
  }

  /**
   * get date of a page.
   *
   * @returns {null|string}
   * @api public
   */

  get date () {
    return inferDate(this.frontmatter, this.filename)
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
        date: this.date,
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
