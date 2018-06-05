const fs = require('fs-extra')
const path = require('path')
const { encodePath, fileToPath } = require('./util')
const {
  inferTitle,
  extractHeaders,
  parseFrontmatter
} = require('../util/index')

module.exports = async function ({
  sourceDir,
  pageFiles,
  plugin,
  markdown,
  siteConfig,
  themeConfig,
  publicPath
}) {
  // resolve pagesData
  const pagesData = await Promise.all(pageFiles.map(async (relative) => {
    const filepath = path.resolve(sourceDir, relative)
    const key = 'v-' + Math.random().toString(16).slice(2)
    const data = {
      key,
      path: encodePath(fileToPath(relative))
    }

    // extract yaml frontmatter
    const content = await fs.readFile(filepath, 'utf-8')

    await plugin.options.extendPageData.run({ data, filepath, relative, key, sourceDir, content })

    const frontmatter = parseFrontmatter(content)
    // infer title
    const title = inferTitle(frontmatter)
    if (title) {
      data.title = title
    }
    const headers = extractHeaders(
      frontmatter.content,
      ['h2', 'h3'],
      markdown
    )
    if (headers.length) {
      data.headers = headers
    }
    if (Object.keys(frontmatter.data).length) {
      data.frontmatter = frontmatter.data
    }
    if (frontmatter.excerpt) {
      const { html } = markdown.render(frontmatter.excerpt)
      data.excerpt = html
    }
    return data
  }))

  const siteData = {
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    base: publicPath,
    pages: pagesData,
    themeConfig,
    locales: siteConfig.locales
  }

  return siteData
}
