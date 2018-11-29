const { chalk } = require('@vuepress/shared-utils')
const semver = require('semver')

try {
  require.resolve('@vuepress/core')
} catch (err) {
  console.log(chalk.red(
    `\n[vuepress] @vuepress/cli ` +
    `requires @vuepress/core to be installed.\n`
  ))
  process.exit(1)
}

const pkg = require('@vuepress/core/package.json')
const requiredVersion = pkg.engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `\n[vuepress] minimum Node version not met:` +
    `\nYou are using Node ${process.version}, but VuePress ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
  ))
  process.exit(1)
}

const cli = require('cac')()

exports.cli = cli
exports.bootstrap = function ({
  plugins,
  theme
} = {}) {
  const { path, logger, env } = require('@vuepress/shared-utils')
  const { dev, build, eject } = require('@vuepress/core')

  cli
    .version(pkg.version)
    .help()

  cli
    .command('dev [targetDir]', 'start development server')
    .option('-p, --port <port>', 'use specified port (default: 8080)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache [cache]', 'set the directory of cache')
    .option('--host <host>', 'use specified host (default: 0.0.0.0)')
    .option('--no-cache', 'clean the cache before build')
    .option('--debug', 'start development server in debug mode')
    .option('--silent', 'start development server in silent mode')
    .action((sourceDir = '.', options) => {
      const {
        host,
        port,
        debug,
        temp,
        cache,
        silent
      } = options
      logger.setOptions({ logLevel: silent ? 1 : debug ? 4 : 3 })
      logger.debug('cli_options', options)
      env.setOptions({ isDebug: debug, isTest: process.env.NODE_ENV === 'test' })

      wrapCommand(dev)(path.resolve(sourceDir), {
        host,
        port,
        temp,
        cache,
        plugins,
        theme
      })
    })

  cli
    .command('build [targetDir]', 'build dir as static site')
    .option('-d, --dest <dest>', 'specify build output dir (default: .vuepress/dist)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache [cache]', 'set the directory of cache')
    .option('--no-cache', 'clean the cache before build')
    .option('--debug', 'build in development mode for debugging')
    .option('--silent', 'build static site in silent mode')
    .action((sourceDir = '.', options) => {
      const {
        debug,
        dest,
        temp,
        cache,
        silent
      } = options
      logger.setOptions({ logLevel: silent ? 1 : debug ? 4 : 3 })
      logger.debug('cli_options', options)
      env.setOptions({ isDebug: debug, isTest: process.env.NODE_ENV === 'test' })

      wrapCommand(build)(path.resolve(sourceDir), {
        debug,
        dest,
        plugins,
        theme,
        temp,
        cache,
        silent
      })
    })

  cli
    .command('eject [targetDir]', 'copy the default theme into .vuepress/theme for customization.')
    .option('--debug', 'eject in debug mode')
    .action((dir = '.') => {
      wrapCommand(eject)(path.resolve(dir))
    })

  // output help information on unknown commands
  cli.on('command:*', () => {
    console.error('Unknown command: %s', cli.args.join(' '))
    console.log()
  })

  function wrapCommand (fn) {
    return (...args) => {
      return fn(...args).catch(err => {
        console.error(chalk.red(err.stack))
        process.exitCode = 1
      })
    }
  }

  cli.parse(process.argv)
  if (!process.argv.slice(2).length) {
    cli.outputHelp()
  }
}

