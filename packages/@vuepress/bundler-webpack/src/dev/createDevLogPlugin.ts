import type { Plugin } from 'webpack'
import { chalk, logger, ora } from '@vuepress/utils'

export const createDevLogPlugin = (url: string): Plugin => ({
  apply(compiler) {
    let hasStarted = false
    let hasFinished = false
    const spinner = ora('Compiling with webpack...')

    compiler.hooks.beforeCompile.tap('vuepress-dev-log', () => {
      if (!hasStarted) {
        hasStarted = true
        spinner.start()
      }
    })

    compiler.hooks.done.tap('vuepress-dev-log', ({ endTime, startTime }) => {
      if (!hasFinished) {
        hasFinished = true
        spinner.succeed(`Compilation finished in ${endTime! - startTime!}ms`)
        logger.success(`VuePress dev server is listening at ${chalk.cyan(url)}`)
      }
    })
  },
})
