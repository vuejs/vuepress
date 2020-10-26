import type { Plugin } from 'webpack'
import { chalk, logger, ora } from '@vuepress/utils'

export const createDevLogPlugin = (url: string): Plugin => ({
  apply(compiler) {
    const spinner = ora()

    let hasStarted = false
    let hasFinished = false

    compiler.hooks.beforeCompile.tap('vuepress-dev-log', () => {
      // start spinner before the first compilation
      if (!hasStarted) {
        hasStarted = true
        spinner.start('Compiling with webpack...')
      }
    })

    compiler.hooks.done.tap('vuepress-dev-log', ({ endTime, startTime }) => {
      // stop spinner and print log after the first compilation
      if (!hasFinished) {
        hasFinished = true
        spinner.succeed(`Compilation finished in ${endTime! - startTime!}ms`)
        logger.success(`VuePress dev server is listening at ${chalk.cyan(url)}`)
      }
    })
  },
})
