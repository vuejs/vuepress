/**
 * @type {import('@vuepress/types').Plugin<{}, import('@vuepress/types').DefaultThemeConfig>}
 */
module.exports = (options, ctx) => ({
  name: '@vuepress/internal-site-data',

  // @internal/siteData
  async clientDynamicModules () {
    const code = `export const siteData = ${JSON.stringify(ctx.getSiteData(), null, 2)}`
    return { name: 'siteData.js', content: code, dirname: 'internal' }
  }
})
