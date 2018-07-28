#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `\n[vuepress] minimum Node version not met:` +
    `\nYou are using Node ${process.version}, but VuePress ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
  ))
  process.exit(1)
}

const path = require('path')
const { dev, build, eject } = require('../lib')

const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('dev [targetDir]')
  .description('start development server')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
  .option('--debug', 'start development server in debug mode')
  .action((dir = '.', { host, port, debug }) => {
    wrapCommand(dev)(path.resolve(dir), { host, port, debug })
  })

program
  .command('build [targetDir]')
  .description('build dir as static site')
  .option('-d, --dest <outDir>', 'specify build output dir (default: .vuepress/dist)')
  .option('--debug', 'build in development mode for debugging')
  .action((dir = '.', { debug, dest }) => {
    const outDir = dest ? path.resolve(dest) : null
    wrapCommand(build)(path.resolve(dir), { debug, outDir })
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

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
      process.exitCode = 1
    })
  }
}
