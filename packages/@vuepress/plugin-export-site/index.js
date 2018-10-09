const siteExport = require('./export')

module.exports = (options = {}, ctx) => {
  return {
    // For production
    async ready () {
      setTimeout(() => {
        siteExport({
          extension: options.extension,
          sourceDir: ctx.sourceDir,
          pages: ctx.pages,
          dest: ctx.outDir
        }, 0)
      })
    }
  }
}
