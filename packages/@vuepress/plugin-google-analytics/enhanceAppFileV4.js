// Patch for Google Analytics 4

/* global GM_ID */
export default (_ctx) => {
  // Google analytics integration
  if (process.env.NODE_ENV === 'production' && GM_ID && typeof window !== 'undefined') {
    (function (global, doc, tag, src, script, m) {
      script = doc.createElement(tag)
      m = doc.getElementsByTagName(tag)[0]
      script.async = 1
      script.src = src
      m.parentNode.insertBefore(script, m)
      global.dataLayer = global.dataLayer || []
      if (!global.gtag) {
        global.gtag = function gtag () {
          global.dataLayer.push(arguments)
        }
        global.gtag('js', new Date())
        global.gtag('config', GM_ID)
      }
    })(window, document, 'script', `https://www.googletagmanager.com/gtag/js?id=${GM_ID}`)
  }
}
