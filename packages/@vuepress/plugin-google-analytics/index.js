const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => {
  /**
   * @type {'webpack'|'head'|'head-alternative'} this option specifies how Google Analytics tracking code is imported
   */
  const importScript = options.importScript || 'webpack'

  const { siteConfig = {}} = context
  const ga = options.ga || siteConfig.ga
  const GA_ID = ga || false

  const production = process.env.NODE_ENV === 'production'

  if (importScript === 'webpack') {
    return ({
      define () {
        return { GA_ID }
      },

      enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
    })
  } else if (production && GA_ID) {
    if (!context.siteConfig) {
      throw new Error('context.siteConfig is not available')
    }

    const head = context.siteConfig.head || (context.siteConfig.head = [])

    if (importScript === 'head') {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_google_analytics_tag
      head.unshift(
        ['script', {}, `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '${GA_ID}', 'auto');
ga('send', 'pageview');
`.trim()]
      )
    } else if (importScript === 'head-alternative') {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tag
      head.unshift(
        ['script', {}, `
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${GA_ID}', 'auto');
ga('send', 'pageview');
`.trim()],
        ['script', { async: 'async', src: 'https://www.google-analytics.com/analytics.js' }]
      )
    } else {
      throw new Error('@vuepress/plugin-google-analytics: options.importScript is invalid.')
    }
  }
}
