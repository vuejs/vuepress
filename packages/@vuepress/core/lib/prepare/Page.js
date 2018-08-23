const path = require('path')
const slugify = require('../markdown/slugify')
const { fs } = require('@vuepress/shared-utils')
const { fileToPath } = require('./util')
const {
  inferTitle,
  extractHeaders,
  parseFrontmatter
} = require('../util/index')

module.exports = class Page {
  constructor (filePath, {
    relative,
    permalink
  }) {
    this._filePath = filePath
    if (relative) {
      this._routePath = encodeURI(fileToPath(relative))
    } else if (permalink) {
      this._routePath = encodeURI(permalink)
    }
    this.path = this._routePath
  }

  async process (markdown, i18n) {
    this.key = 'v-' + Math.random().toString(16).slice(2)
    this._content = await fs.readFile(this._filePath, 'utf-8')
    const frontmatter = parseFrontmatter(this._content)

    // infer title
    const title = inferTitle(frontmatter)
    if (title) {
      this.title = title
    }

    // headers
    const headers = extractHeaders(
      frontmatter.content,
      ['h2', 'h3'],
      markdown
    )
    if (headers.length) {
      this.headers = headers
    }

    this.frontmatter = frontmatter.data

    if (frontmatter.excerpt) {
      const { html } = markdown.render(frontmatter.excerpt)
      this.excerpt = html
    }

    // resolve i18n
    i18n.setSSRContext(this)
    this._i18n = i18n
  }

  get filename () {
    return path.parse(this._filePath).name
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
