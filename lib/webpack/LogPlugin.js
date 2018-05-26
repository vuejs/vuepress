const chalk = require('chalk')
const logger = require('../util/logger')

module.exports = class LogPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    if (this.options.mode === 'production') {
      compiler.hooks.compile.tap('vuepress-log', clearScreen)
    } else {
      let isFirst = true
      compiler.hooks.done.tap('vuepress-log', stats => {
        clearScreen()

        const { displayHost, port, publicPath } = this.options
        const time = new Date().toTimeString().match(/^[\d:]+/)[0]

        console.log()
        logger.success(`${chalk.gray(`[${time}]`)} Build ${chalk.italic(stats.hash.slice(0, 6))} finished in ${stats.endTime - stats.startTime} ms!`)
        if (isFirst) {
          isFirst = false
          console.log(`\n${chalk.gray('>')} VuePress dev server listening at ${chalk.cyan(`http://${displayHost}:${port}${publicPath}`)}`)
        }
      })
    }

    compiler.hooks.invalid.tap('vuepress-log', clearScreen)
  }
}

function clearScreen () {
  process.stdout.write('\x1Bc')
}
