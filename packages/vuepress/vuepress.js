#!/usr/bin/env node

const checkEnv = require('./lib/checkEnv')
const { CLI } = require('./lib/util')
const registerCoreCommands = require('./lib/registerCoreCommands')
const handleUnknownCommand = require('./lib/handleUnknownCommand')

const OPTIONS = {
  theme: '@vuepress/default'
}

CLI({
  async beforeParse (cli) {
    checkEnv()
    registerCoreCommands(cli, OPTIONS)
    await handleUnknownCommand(cli, OPTIONS)

    const pkg = require('@vuepress/core/package.json')
    cli.version(pkg.version).help()
  },

  async afterParse (cli) {
    if (!process.argv.slice(2).length) {
      cli.outputHelp()
    }
  }
})

