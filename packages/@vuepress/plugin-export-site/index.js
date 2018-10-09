const siteExport = require('./export')

module.exports = (options, ctx) => {
  return {
    // For production
    async generated () {
      console.log('generated!', ctx)
      siteExport(options)
    }
  }
}
