function fileNameConverter (filename) {
  return filename.replace(/\/$/, '/index.html').replace(/^\//, '')
}

function xmlFormatter (options) {
  const content = options.siteData.pages.reduce((prev, current) => {
    const filename = fileNameConverter(current.path)
    const url = options.siteConfig.sitemap.domain + options.siteData.base + filename
    return prev + `<url><loc>${url}</loc></url>`
  }, '')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${content}
</urlset>`
}

function txtFormatter (options) {
  return options.siteData.pages.reduce((prev, current) => {
    const filename = fileNameConverter(current.path)
    return prev.trim() + '\n' + options.siteConfig.sitemap.domain + options.siteData.base + filename
  }, '')
}

module.exports = function (options) {
  const sm = options.siteConfig.sitemap
  const fn = sm.filename || 'sitemap.txt'
  const ext = fn.split('.')
  return {
    content: ext[ext.length - 1] === 'xml' ? xmlFormatter(options) : txtFormatter(options),
    filename: fn
  }
}
