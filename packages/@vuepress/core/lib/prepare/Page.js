const path = require('path')
const slugify = require('../markdown/slugify')
const { inferTitle, extractHeaders } = require('../util/index')
const {
  fs, fileToPath, parseFrontmatter, getPermalink,
  datatypes: { isPlainObject }
} = require('@vuepress/shared-utils')

module.exports = class Page {
  constructor (filePath, {
    relative,
    permalink,
    permalinkPattern
  }) {
    this._filePath = filePath
    if (relative) {
      this._routePath = encodeURI(fileToPath(relative))
    } else if (permalink) {
      this._routePath = encodeURI(permalink)
    }
    this.regularPath = this.path = this._routePath
    this._permalinkPattern = permalinkPattern
  }

  async process (markdown, i18n, enhancers) {
    this.key = 'v-' + Math.random().toString(16).slice(2)
    this._content = await fs.readFile(this._filePath, 'utf-8')
    this._frontmatterMeta = parseFrontmatter(this._content)

    // infer title
    const title = inferTitle(this._frontmatterMeta)
    if (title) {
      this.title = title
    }

    // headers
    const headers = extractHeaders(
      this._frontmatterMeta.content,
      ['h2', 'h3'],
      markdown
    )
    if (headers.length) {
      this.headers = headers
    }

    for (const { name: pluginName, value: enhancer } of enhancers) {
      let response
      try {
        response = enhancer(this)
      } catch (error) {
        throw new Error(`[${pluginName}] excuete extendPageData failed.`)
      }
      if (isPlainObject(response)) {
        Object.keys(response).forEach(key => {
          if (!this[key]) {
            this[key] = response[key]
          }
        })
      }
    }

    this.frontmatter = this._frontmatterMeta.data

    if (this._frontmatterMeta.excerpt) {
      const { html } = markdown.render(this._frontmatterMeta.excerpt)
      this.excerpt = html
    }

    // resolve i18n
    i18n.setSSRContext(this)
    this._i18n = i18n

    this._permalink = getPermalink({
      pattern: this.frontmatter.permalink || this._permalinkPattern,
      slug: this.slug,
      date: this.frontmatter.date,
      localePath: i18n.$localePath,
      regularPath: this.regularPath
    })

    if (this._permalink) {
      this.path = this._permalink
    }
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
