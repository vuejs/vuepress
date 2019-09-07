'use strict'

/**
 * Module dependencies.
 */

const { chalk, logger, performance } = require('@vuepress/shared-utils')

/**
 * Expose DevLogPlugin class.
 */

module.exports = class DevLogPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    let isFirst = true
    const { displayHost, port, publicPath, clearScreen: shouldClearScreen = true } = this.options

    compiler.hooks.done.tap('vuepress-log', stats => {
      if (shouldClearScreen) {
        clearScreen()
      }

      const time = new Date().toTimeString().match(/^[\d:]+/)[0]
      const displayUrl = `http://${displayHost}:${port}${publicPath}`

      logger.success(
        `${chalk.gray(`[${time}]`)} Build ${chalk.italic(stats.hash.slice(0, 6))} `
        + `finished in ${stats.endTime - stats.startTime} ms! `
        + (
          isFirst
            ? ''
            : `${chalk.gray(`( ${displayUrl} )`)}`
        )
      )
      if (isFirst) {
        isFirst = false
        console.log(`${chalk.gray('>')} VuePress dev server listening at ${chalk.cyan(displayUrl)}`)
        const { duration } = performance.stop()
        logger.developer(`It took a total of ${chalk.cyan(`${duration}ms`)} to run the ${chalk.cyan('vuepress dev')} for the first time.`)
      }
    })
    if (shouldClearScreen) {
      compiler.hooks.invalid.tap('vuepress-log', clearScreen)
    }
  }
}

function clearScreen () {
  process.stdout.write('\x1Bc')
}
