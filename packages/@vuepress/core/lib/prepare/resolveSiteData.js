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
  async function getPageData ({ filepath, routePath, base }) {
    const key = 'v-' + Math.random().toString(16).slice(2)
    const data = { key, path: routePath, filepath }

    const content = await fs.readFile(filepath, 'utf-8')
    await plugin.options.extendPageData.apply({ data, filepath, routePath, base, key, content })

    // extract yaml frontmatter
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
  }

  // resolve pagesData
  const pagesData = await Promise.all(pageFiles.map(async (base) => {
    const filepath = path.resolve(sourceDir, base)
    const routePath = encodePath(fileToPath(base))
    return getPageData({ filepath, routePath, base })
  }))

  // resolve additional pagesData
  const additionalPagesData = await Promise.all(
    plugin.options.additionalPages.values.map(async ({ route: routePath, path: filepath }) => {
      if (!fs.existsSync(filepath)) {
        throw new Error(`[vuepress] Cannot resolve additional page: ${filepath}`)
      }
      return getPageData({ filepath, routePath })
    })
  )

  const siteData = {
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    base: publicPath,
    pages: [
      ...pagesData,
      ...additionalPagesData
    ],
    themeConfig,
    locales: siteConfig.locales
  }

  return siteData
}
