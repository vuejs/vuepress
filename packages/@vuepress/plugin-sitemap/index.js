const { path, fs, logger } = require('@vuepress/shared-utils')
const { createSitemap } = require('sitemap')

module.exports = ({ hostname, changefreq = 'daily', cacheTime = 600000, urls = [] }, context) => ({
  async generated () {
    if (!hostname) {
      return logger.warn(`\nNot generating sitemap because required 'hostname' option doesn't exist `)
    }

    logger.wait('\nGenerating sitemap...')

    const { pages } = context.getSiteData()
    const _urls = pages.map(i => {
      const lastmodISO = i.lastUpdated ? new Date(i.lastUpdated).toISOString() : undefined

      return {
        url: i.path,
        lastmodISO,
        changefreq
      }
    })
    .concat(urls)

    const sitemap = createSitemap({
      hostname: hostname,
      cacheTime: cacheTime || 600000, // 600 sec cache period
      urls: _urls
    })

    const sitemapXML = path.resolve(context.outDir, 'sitemap.xml')

    await fs.writeFile(
      sitemapXML,
      sitemap.toString()
    )
  }
})
