const siteExport = require('./export')

module.exports = (options = {}, ctx) => {
  return {
    async ready () {
      setTimeout(() => {
        siteExport({
          extension: options.extension,
          sourceDir: ctx.sourceDir,
          pages: ctx.pages,
          dest: ctx.outDir,
          enabled: !ctx.isProd
        }, 0)
      })
    }
  }
}
