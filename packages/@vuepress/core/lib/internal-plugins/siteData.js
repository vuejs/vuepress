module.exports = (options, context) => ({
  name: '@vuepress/internal-site-data',

  // @internal/siteData
  async clientDynamicModules () {
    const code = `export const siteData = ${JSON.stringify(context.siteData, null, 2)}`
    return [{ name: 'siteData.js', content: code }]
  }
})
