/* global GA_ID, ga */

export default ({ router }) => {
// Google analytics integration
  if (process.env.NODE_ENV === 'production' && GA_ID && typeof window !== 'undefined') {
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }
      i[r].l = 1 * new Date()
      a = s.createElement(o)
      m = s.getElementsByTagName(o)[0]
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

    ga('create', GA_ID, 'auto')
    ga('set', 'anonymizeIp', true)

    router.afterEach(function (to) {
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    })
  }
}

