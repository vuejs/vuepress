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

const program = require('commander')

exports.program = program
exports.bootstrap = function ({
  plugins,
  theme
} = {}) {
  const { path } = require('@vuepress/shared-utils')
  const { dev, build, eject } = require('@vuepress/core')

  program
    .version(pkg.version)
    .usage('<command> [options]')

  program
    .command('dev [targetDir]')
    .description('start development server')
    .option('-p, --port <port>', 'use specified port (default: 8080)')
    .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache <cache>', 'set the directory of cache')
    .option('--no-cache', 'clean the cache before build')
    .option('--debug', 'start development server in debug mode')
    .action((dir = '.', { host, port, debug, temp, cache }) => {
      wrapCommand(dev)(path.resolve(dir), { host, port, debug, temp, cache, plugins, theme })
    })

  program
    .command('build [targetDir]')
    .description('build dir as static site')
    .option('-d, --dest <outDir>', 'specify build output dir (default: .vuepress/dist)')
    .option('-t, --temp <temp>', 'set the directory of the temporary file')
    .option('-c, --cache <cache>', 'set the directory of cache')
    .option('--no-cache', 'clean the cache before build')
    .option('--debug', 'build in development mode for debugging')
    .action((dir = '.', { debug, dest, temp, cache }) => {
      const outDir = dest ? path.resolve(dest) : null
      wrapCommand(build)(path.resolve(dir), { debug, outDir, plugins, theme, temp, cache })
    })

  program
    .command('eject [targetDir]')
    .description('copy the default theme into .vuepress/theme for customization.')
    .action((dir = '.') => {
      wrapCommand(eject)(path.resolve(dir))
    })

  // output help information on unknown commands
  program
    .arguments('<command>')
    .action((cmd) => {
      program.outputHelp()
      console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
      console.log()
    })

  // add some useful info on help
  program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`vuepress <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

  program.commands.forEach(c => c.on('--help', () => console.log()))

  // enhance common error messages
  const enhanceErrorMessages = (methodName, log) => {
    program.Command.prototype[methodName] = function (...args) {
      if (methodName === 'unknownOption' && this._allowUnknownOption) {
        return
      }
      this.outputHelp()
      console.log(`  ` + chalk.red(log(...args)))
      console.log()
      process.exit(1)
    }
  }

  enhanceErrorMessages('missingArgument', argName => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
  })

  enhanceErrorMessages('unknownOption', optionName => {
    return `Unknown option ${chalk.yellow(optionName)}.`
  })

  enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
      flag ? `, got ${chalk.yellow(flag)}` : ``
    )
  })

  function wrapCommand (fn) {
    return (...args) => {
      return fn(...args).catch(err => {
        console.error(chalk.red(err.stack))
        process.exitCode = 1
      })
    }
  }

  program.parse(process.argv)
  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}
