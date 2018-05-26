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

        if (stats.hasErrors()) {
          process.exitCode = 1
          const { errors } = stats.compilation
          console.log(errors)
          console.log()
          logger.error('Compiled with errors!')
          return
        }

        if (stats.hasWarnings()) {
          process.exitCode = 1
          outputStats(stats)
          console.log()
          logger.error('Compiled with warnings!')
          console.log()
          return
        }

        const { displayHost, port, publicPath } = this.options
        const time = new Date().toTimeString().match(/^[\d:]+/)[0]

        logger.success(`${chalk.gray(`[${time}]`)} Build ${chalk.italic(stats.hash.slice(0, 6))} finished in ${stats.endTime - stats.startTime} ms!`)
        if (isFirst) {
          isFirst = false
          console.log(`\nVuePress dev server listening at ${chalk.cyan(`http://${displayHost}:${port}${publicPath}`)}`)
        }
      })
    }

    compiler.hooks.invalid.tap('vuepress-log', clearScreen)
  }
}

function outputStats (stats) {
  console.log(stats.toString({
    colors: true,
    chunks: false,
    modules: false,
    children: false,
    version: false,
    hash: false,
    timings: false
  }))
}

function clearScreen () {
  process.stdout.write('\x1Bc')
}
