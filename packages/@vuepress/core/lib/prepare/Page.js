const path = require('path')
const slugify = require('../markdown/slugify')
const { inferTitle, extractHeaders } = require('../util/index')
const { fs, fileToPath, parseFrontmatter, getPermalink } = require('@vuepress/shared-utils')

module.exports = class Page {
  /**
   * @param { string } title markdown title
   * @param { string } content markdown file content
   * @param { string } filePath absolute file path of source markdown file.
   * @param { string } relative relative file path of source markdown file.
   * @param { string } permalink the URL (excluding the domain name) for your pages, posts.
   * @param { object } frontmatter
   * @param { string } permalinkPattern
   */
  constructor ({
    path,
    title,
    content,
    filePath,
    relative,
    permalink,
    frontmatter = {},
    permalinkPattern
  }) {
    this.title = title
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

    this._enhance(enhancers)
    this.buildPermalink()
  }

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

  _enhance (enhancers) {
    for (const { name: pluginName, value: enhancer } of enhancers) {
      try {
        enhancer(this)
      } catch (error) {
        console.log(error)
        throw new Error(`[${pluginName}] excuete extendPageData failed.`)
      }
    }
  }

  get filename () {
    return path.parse(this._filePath || this.regularPath).name
  }

  get slug () {
    return slugify(this.filename)
  }

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
}
