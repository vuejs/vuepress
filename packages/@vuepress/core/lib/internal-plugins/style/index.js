const path = require('path')
const { fs, logger, chalk } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress/internal-style',

  enhanceAppFiles: [path.resolve(__dirname, 'client.js')],

  async ready () {
    const { sourceDir, writeTemp } = context

    const overridePath = path.resolve(sourceDir, '.vuepress/override.styl')
    const hasUserOverride = fs.existsSync(overridePath)

    if (hasUserOverride) {
      logger.tip(`${chalk.magenta('override.styl')} has been deprecated from v1.0.0, using ${chalk.cyan('config.palette')} instead.\n`)
    }

    // style.styl API.
    const stylePath = path.resolve(sourceDir, '.vuepress/style.styl').replace(/[\\]+/g, '/')
    const hasUserStyle = fs.existsSync(stylePath)
    await writeTemp('style.styl', hasUserStyle ? `@import(${JSON.stringify(stylePath)})` : ``)

    // Temporary tip, will be removed at next release.
    if (hasUserOverride && !hasUserStyle) {
      logger.tip(
        `${chalk.magenta('override.styl')} has been split into 2 APIs, we recommend you upgrade to continue.\n` +
        `      See: ${chalk.magenta('https://vuepress.vuejs.org/default-theme-config/#simple-css-override')}`
      )
    }
  }
})

