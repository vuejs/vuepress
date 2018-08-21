const { fs } = require('@vuepress/shared-utils')
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
  pluginAPI,
  markdown,
  siteConfig,
  themeConfig,
  publicPath
}) {
  async function getPageData ({ filePath, routePath, base }) {
    const key = 'v-' + Math.random().toString(16).slice(2)
    const data = { key, path: routePath, filePath }

    const content = await fs.readFile(filePath, 'utf-8')
    await pluginAPI.options.extendPageData.apply({ data, filePath, routePath, base, key, content })

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
    const filePath = path.resolve(sourceDir, base)
    const routePath = encodePath(fileToPath(base))
    return getPageData({ filePath, routePath, base })
  }))

  // resolve additional pagesData
  const additionalPagesData = await Promise.all(
    pluginAPI.options.additionalPages.values.map(async ({ route: routePath, path: filePath }) => {
      if (!fs.existsSync(filePath)) {
        throw new Error(`[vuepress] Cannot resolve additional page: ${filePath}`)
      }
      return getPageData({ filePath, routePath })
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
