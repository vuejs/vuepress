#!/usr/bin/env node

const updateNotifier = require('update-notifier')

const checkEnv = require('./lib/checkEnv')
const { CLI } = require('./lib/util')
const registerCoreCommands = require('./lib/registerCoreCommands')
const handleUnknownCommand = require('./lib/handleUnknownCommand')

const OPTIONS = {
  theme: '@vuepress/default'
}

CLI({
  async beforeParse (cli) {
    const pkg = require('@vuepress/core/package.json')
    checkEnv(pkg)
    updateNotifier({ pkg }).notify()
    registerCoreCommands(cli, OPTIONS)
    await handleUnknownCommand(cli, OPTIONS)
    cli.version(pkg.version).help()
  },

  async afterParse (cli) {
    if (!process.argv.slice(2).length) {
      cli.outputHelp()
    }
  }
})

