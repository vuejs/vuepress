'use strict'

/**
 * Module dependencies.
 */

const { inferDate, DATE_RE } = require('./util/index')
const {
  fs,
  path,
  hash,
  chalk,
  logger,
  slugify,
  inferTitle,
  fileToPath,
  getPermalink,
  extractHeaders,
  parseFrontmatter,
  parseVueFrontmatter: { parse: parseVueFrontmatter }
} = require('@vuepress/shared-utils')

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
    path: _path,
    meta,
    title,
    content,
    filePath,
    relative,
    permalink,
    frontmatter = {},
    permalinkPattern,
    extractHeaders = ['h2', 'h3']
  }, context) {
    this.title = title
    this._meta = meta
    this._filePath = filePath
    this._content = content
    this._permalink = permalink
    this.frontmatter = frontmatter
    this._permalinkPattern = permalinkPattern
    this._extractHeaders = extractHeaders
    this._context = context

    if (relative) {
      this.regularPath = encodeURI(fileToPath(relative))
    } else if (_path) {
      this.regularPath = encodeURI(_path)
    } else if (permalink) {
      this.regularPath = encodeURI(permalink)
    }

    if (filePath) {
      this.relativePath = path.relative(context.sourceDir, filePath).replace(/\\/g, '/')
    }

    this.key = 'v-' + hash(`${this._filePath}${this.regularPath}`)
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
    enhancers = [],
    preRender = {}
  }) {
    if (this._filePath) {
      logger.developer(`static_route`, chalk.cyan(this.path))
      this._content = await fs.readFile(this._filePath, 'utf-8')
    } else if (this._content) {
      logger.developer(`static_route`, chalk.cyan(this.path))
      this._filePath = await this._context.writeTemp(`temp-pages/${this.key}.md`, this._content)
    } else {
      logger.developer(`dynamic_route`, chalk.cyan(this.path))
    }

    if (this._content) {
      if (this._filePath.endsWith('.md')) {
        const { excerpt, data, content } = parseFrontmatter(this._content)
        this._strippedContent = content
        Object.assign(this.frontmatter, data)

        // infer title
        const title = inferTitle(this.frontmatter, this._strippedContent)
        if (title) {
          this.title = title
        }

        // extract headers
        const headers = extractHeaders(
          this._strippedContent,
          this._extractHeaders,
          markdown
        )

        if (headers.length) {
          this.headers = headers
        }

        if (excerpt) {
          const { html } = markdown.render(excerpt, {
            frontmatter: this.frontmatter,
            relativePath: this.relativePath
          })
          this.excerpt = html
        }
      } else if (this._filePath.endsWith('.vue')) {
        const { data = {}} = parseVueFrontmatter(this._content)
        // When Vue SFCs are source files, make them as layout components directly.
        this.frontmatter = Object.assign({
          layout: this.key
        }, data)
      }
    }

    // resolve i18n
    computed.setPage(this)
    this._computed = computed
    this._localePath = computed.$localePath

    await this.enhance(enhancers)
    this.buildPermalink()
  }

  /**
   * name of page's parent directory.
   *
   * @returns {string}
   * @api public
   */

  get dirname () {
    return path.basename(path.dirname(this._filePath || this.regularPath))
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
    const strippedFilename = this.strippedFilename

    if (/^(index|readme)$/i.test(strippedFilename)) {
      const strippedFilename = this.stripFilename(
        path.basename(path.dirname(this._filePath || this.regularPath))
      )

      if (strippedFilename) {
        return slugify(strippedFilename)
      }
    }

    return slugify(strippedFilename)
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
    return this.stripFilename(this.filename)
  }

  /**
   * get date of a page.
   *
   * @returns {null|string}
   * @api public
   */

  get date () {
    return inferDate(this.frontmatter, this.filename, this.dirname)
  }

  /**
   * stripped file name.
   *
   * If filename was yyyy-MM-dd-[title], the date prefix will be stripped.
   * If filename was yyyy-MM-[title], the date prefix will be stripped.
   *
   * @param {string} fileName
   * @returns {string}
   * @private
   */
  stripFilename (fileName) {
    const match = fileName.match(DATE_RE)

    return match ? match[3] : fileName
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
   *   1. Modify page's frontmatter.
   *   2. Add extra field to the page.
   *
   * @api private
   */

  async enhance (enhancers) {
    for (const { name: pluginName, value: enhancer } of enhancers) {
      try {
        await enhancer(this)
      } catch (error) {
        console.log(error)
        throw new Error(`[${pluginName}] execute extendPageData failed.`)
      }
    }
  }
}
