'use strict'

const {
  slugify: SLUGIFY,
  path: PATH,
  fs: FSE,
  chalk: CHALK,
  logger: LOGGER
} = require('@vuepress/shared-utils')

// -----------------------------------------------------------------------------

const CMD_NAME = PATH.basename(__filename).replace('.js', '')

// -----------------------------------------------------------------------------

// promisify https used for fetching lorem markdown

const HTTPS = require('https')
const { promisify: PROMISIFY } = require('util')

HTTPS.get[PROMISIFY.custom] = (options) => {
  return new Promise((resolve, reject) => {
    HTTPS.get(options, (response) => {
      response.end = new Promise((resolve) => response.on('end', resolve))
      resolve(response)
    }).on('error', reject)
  })
}

const HTTP_GET = PROMISIFY(HTTPS.get)

// -----------------------------------------------------------------------------

/**
 * Class for creating a new page
 */
class Page {
  /**
   * constructor
   *
   * @param {string} dir - the root target directory
   * @param {object} options - cli command options
   */
  constructor (dir, options = {}) {
    this.dir = dir
    this.options = options

    // -------------------------------------------------------------------------

    this.frontmatter = this.options.frontmatter || this.options.fm || {}
    this.frontmatter.title = this.options.title || this.frontmatter.title || ''
    this.frontmatter.date = this.frontmatter.date || new Date()

    // -------------------------------------------------------------------------

    // as a minimum, we need either the title or the path

    if (!this.frontmatter.title && !this.options.path) {
      throw new Error('title or path required')
    }
  }

  /**
   * page title
   *
   * @returns {string}
   */
  get title () {
    return this.frontmatter.title
  }

  /**
   * file name slug based on slug option or slugified title
   *
   * @returns {string}
   */
  get slug () {
    return this.options.slug ? this.options.slug : SLUGIFY(this.title, { lower: true })
  }

  /**
   * if page is not created in it's own directory
   *
   * @returns {bool}
   */
  get nodir () {
    return (this.options.nodir || this.options.notInOwnDirectory)
  }

  /**
   * filename when page is created in it's own directory
   *
   * @returns {string}
   */
  get filename () {
    return this.options.filename ? this.options.filename : 'README.md'
  }

  /**
   * resolve page path
   *
   * @returns {string}
   */
  get path () {
    if (this.options.path) {
      // @notes: this is left up to the user; no checks done
      return PATH.resolve(this.dir, this.options.path)
    }

    // -------------------------------------------------------------------------

    const slug = this.slug
    let path

    if (this.nodir) {
      const filename = PATH.extname(slug) ? slug : `${slug}.md`
      path = [this.dir, filename]
    } else {
      path = [this.dir, slug, this.filename]
    }

    // -------------------------------------------------------------------------

    return PATH.join(...path.filter(e => e))
  }

  /**
   * default template based on frontmatter options
   *
   * @returns {string}
   */
  getDefaultTemplate () {
    try {
      // template frontmatter

      const template = []

      template.push('---')
      template.push('')

      for (const key of Object.keys(this.frontmatter)) {
        const fm = this.frontmatter[ key ]
        const value = Array.isArray(fm) ? `\n  - ${fm.join('\n  - ')}` : fm

        template.push(`${key}: ${value}`)
      }

      template.push('')
      template.push('---')

      // -----------------------------------------------------------------------

      // template content

      template.push('')
      template.push('%%content%%')
      template.push('')

      // -----------------------------------------------------------------------

      return template.join('\n')
    } catch (err) {
      throw err
    }
  }

  /**
   * user defined template file
   *
   * @returns {string}
   */
  async getTemplateFromFile () {
    try {
      const file = this.options.template || ''

      if (!file) {
        return
      }

      // -----------------------------------------------------------------------

      const exists = await FSE.pathExists(file)

      if (exists) {
        const content = await FSE.readFile(file, 'utf8')
        return content
      } else {
        LOGGER.warn(`[vuepress ${CMD_NAME}] template file '${CHALK.cyan(file)}' does not exist; falling back to default template.\n`)
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * fetch lorem markdown using https://github.com/jaspervdj/lorem-markdownum
   *
   * @returns {string}
   */
  async fetchLorem () {
    try {
      const res = await HTTP_GET('https://jaspervdj.be/lorem-markdownum/markdown.txt')

      let body = ''

      res.on('data', (chunk) => (body += chunk))

      await res.end

      // -----------------------------------------------------------------------

      // make it more interesting by replacing first header
      // with page title, lorem image, and toc

      const headerReplacement = [
        `# ${this.title}`,
        '![random image](http://lorempixel.com/1024/576)',
        '[[toc]]'
      ].join('\n\n')

      return body.replace(/^#+\s*.*/i, headerReplacement)
    } catch (err) {
      throw err
    }
  }

  /**
   * replaces supported tokens in template
   *
   * @returns {string}
   */
  async replaceTokens (template) {
    try {
      const tokens = {
        title: this.frontmatter.title,
        date: this.frontmatter.date,
        content: this.options.content || '# {{ $page.title }}'
      }

      // -----------------------------------------------------------------------

      for (const key of Object.keys(tokens)) {
        let replacement = tokens[ key ]

        if (key === 'content' && replacement === '%%lorem%%') {
          replacement = await this.fetchLorem()
        }

        // ---------------------------------------------------------------------

        const regex = new RegExp(`%%${key}%%`, 'gmi')

        template = template.replace(regex, replacement)
      }

      // -----------------------------------------------------------------------

      return template
    } catch (err) {
      throw err
    }
  }

  /**
   * get template either from a user defined file or fallback to the default one
   *
   * @returns {string}
   */
  async getTemplate () {
    try {
      let template = await this.getTemplateFromFile()

      if (!template) {
        template = this.getDefaultTemplate()
      }

      // -----------------------------------------------------------------------

      template = await this.replaceTokens(template)

      // -----------------------------------------------------------------------

      return template
    } catch (err) {
      throw err
    }
  }

  /**
   * creates the page file
   *
   * @returns {string}
   */
  async create () {
    try {
      const file = this.path
      const exists = await FSE.pathExists(file)
      const relative = PATH.relative(process.cwd(), file)

      if (exists) {
        LOGGER.error(`[vuepress ${CMD_NAME}] file already exists: '${CHALK.cyan(relative)}'\n`)
        process.exit(1)
      }

      // -----------------------------------------------------------------------

      const template = await this.getTemplate()

      // -----------------------------------------------------------------------

      await FSE.outputFile(file, template)

      LOGGER.success(`[vuepress ${CMD_NAME}] created new page in '${CHALK.cyan(relative)}'.\n`)
    } catch (err) {
      throw err
    }
  }
}

// -----------------------------------------------------------------------------

module.exports = async (dir, options = {}) => {
  try {
    await new Page(dir, options).create()
  } catch (err) {
    LOGGER.error(CHALK.red(`\n[vuepress ${CMD_NAME}] ${err.message}\n`))
  }
}
