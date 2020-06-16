'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs-extra')
const { chalk } = require('@vuepress/shared-utils')
const envinfo = require('envinfo')

const { dev, build, eject } = require('@vuepress/core')
const { path, logger, env } = require('@vuepress/shared-utils')
const { wrapCommand } = require('./util')

/**
 * Expose registerCoreCommands function.
 */

module.exports = function (cli, options) {
  cli
    .command(`create [directoryName]`, 'create VuePress scaffold')
    .action((directoryName) => {
      const scaffoldPath = `./${directoryName}`

      // Create directory
      // TODO: Check for existing directory
      // TODO: If directory exists, give option to override?
      fs.mkdirSync(directoryName, { recursive: true })
      console.log(chalk.green(`Successfully created directory for ${directoryName}`))
      // Create home page with basic default theme features
      fs.writeFileSync(`${scaffoldPath}/README.md`, `---
home: true
heroImage: /vuepress-logo.png
actionText: Call to Action →
actionLink: /basic/
features:
- title: Feature No. 1
  details: Here you can talk about feature number 1.
- title: Feature No. 2
  details: Here you can talk about feature number 2.
- title: Feature No. 3
  details: Here you can talk about feature number 3.
footer: This is your homepage footer
---
      `)
      console.log(chalk.yellow(`Successfully created README file`))
      fs.mkdirSync(`${scaffoldPath}/.vuepress`, { recursive: true })
      console.log(chalk.blue(`Successfully created VuePress directory`))

      try {
        const configPath = require.resolve('vuepress/template/config-template.js')
        const configContent = fs.readFileSync(configPath)
        fs.writeFileSync(`${scaffoldPath}/.vuepress/config.js`, configContent)
        console.log(chalk.magenta(`Successfully created README file`))
      } catch (err) {
        console.error(err)
      }
    })

  cli
    .command(`dev [targetDir]`, 'start development server')
    .option('-p, --port <port>', 'use specified port (default: 8080)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache [cache]', 'set the directory of cache')
    .option('--host <host>', 'use specified host (default: 0.0.0.0)')
    .option('--no-cache', 'clean the cache before build')
    .option('--no-clear-screen', 'do not clear screen when dev server is ready')
    .option('--debug', 'start development server in debug mode')
    .option('--silent', 'start development server in silent mode')
    .option('--open', 'open browser when ready')
    .action((sourceDir = '.', commandOptions) => {
      const { debug, silent } = commandOptions

      logger.setOptions({ logLevel: silent ? 1 : debug ? 4 : 3 })
      logger.debug('global_options', options)
      logger.debug('dev_options', commandOptions)
      env.setOptions({ isDebug: debug, isTest: process.env.NODE_ENV === 'test' })

      wrapCommand(dev)({
        sourceDir: path.resolve(sourceDir),
        ...options,
        ...commandOptions
      })
    })

  cli
    .command('build [targetDir]', 'build dir as static site')
    .option('-d, --dest <dest>', 'specify build output dir (default: .vuepress/dist)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache [cache]', 'set the directory of cache')
    .option('--dest <dest>', 'the output directory for build process')
    .option('--no-cache', 'clean the cache before build')
    .option('--debug', 'build in development mode for debugging')
    .option('--silent', 'build static site in silent mode')
    .action((sourceDir = '.', commandOptions) => {
      const { debug, silent } = commandOptions

      logger.setOptions({ logLevel: silent ? 1 : debug ? 4 : 3 })
      logger.debug('global_options', options)
      logger.debug('build_options', commandOptions)
      env.setOptions({ isDebug: debug, isTest: process.env.NODE_ENV === 'test' })

      wrapCommand(build)({
        sourceDir: path.resolve(sourceDir),
        ...options,
        ...commandOptions
      })
    })

  cli
    .command('eject [targetDir]', 'copy the default theme into .vuepress/theme for customization.')
    .option('--debug', 'eject in debug mode')
    .action((dir = '.') => {
      wrapCommand(eject)(path.resolve(dir))
    })

  cli
    .command('info', 'Shows debugging information about the local environment')
    .action(() => {
      console.log(chalk.bold('\nEnvironment Info:'))
      envinfo.run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'Yarn', 'npm'],
          Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
          npmGlobalPackages: ['vuepress'],
          npmPackages: [
            'vuepress',
            '@vuepress/core',
            '@vuepress/theme-default'
          ]
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true
        }
      ).then(console.log)
    })
}
