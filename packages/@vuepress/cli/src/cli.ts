import { cac } from 'cac'
import { build, dev } from './commands'

/**
 * Vuepress cli
 */
export const cli = (): void => {
  const program = cac('vuepress')

  // display core version and cli version
  const versionCli = require('../package.json').version
  const versionCore = require('@vuepress/core/package.json').version
  program.version(`core@${versionCore} vuepress/cli@${versionCli}`)

  // display help message
  program.help()

  // register `dev` command
  program
    .command('dev [sourceDir]', 'start development server')
    .option('-p, --port <port>', 'use specified port (default: 8080)')
    .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
    .option('-t, --temp <temp>', 'set the directory of the temporary files')
    .option('--debug', 'start development server in debug mode')
    .option('--open', 'open browser when ready')
    .action(dev)

  // register `build` command
  program
    .command('build [sourceDir]', 'build to static site')
    .option(
      '-d, --dest <dest>',
      'set the directory build output (default: .vuepress/dist)'
    )
    .option('-t, --temp <temp>', 'set the directory of the temporary files')
    .option('--debug', 'build in debug mode')
    .action(build)

  program.parse(process.argv)
}
