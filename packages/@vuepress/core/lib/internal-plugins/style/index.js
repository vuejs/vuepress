const { fs, path, logger, chalk } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress/internal-style',

  enhanceAppFiles: [path.resolve(__dirname, 'client.js')],

  async ready () {
    const { sourceDir, writeTemp } = context

    const overridePath = path.resolve(sourceDir, '.vuepress/override.styl')
    const hasUserOverride = fs.existsSync(overridePath)

    if (hasUserOverride) {
      logger.tip(`${chalk.magenta('override.styl')} has been deprecated from v1.0.0, using ${chalk.cyan('.vuepress/style/palette.styl')} instead.\n`)
    }

    // style.styl API.
    const stylePath = path.resolve(sourceDir, '.vuepress/styles/index.styl')
    const hasUserStyle = fs.existsSync(stylePath)
    await writeTemp('style.styl', hasUserStyle ? `@import(${JSON.stringify(stylePath)})` : '')
  }
})

