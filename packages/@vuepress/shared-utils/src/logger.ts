'use strict'

/**
 * Module dependencies.
 */

import chalk from 'chalk'

interface LoggerOptions {
  logLevel: number
}

class Logger {
  options: LoggerOptions

  constructor (options?: LoggerOptions) {
    this.options = Object.assign(
      {
        logLevel: process.argv.includes('--debug')
          ? 4
          : 3
      },
      options
    )
  }

  setOptions (options: LoggerOptions) {
    Object.assign(this.options, options)
  }

  // level: 4
  debug (...args: any[]) {
    if (this.options.logLevel < 4) {
      return
    }

    this.status('magenta', 'debug', ...args)
  }

  // level: 2
  warn (...args: any[]) {
    if (this.options.logLevel < 2) {
      return
    }
    console.warn(chalk.yellow('warning'), ...args)
  }

  // level: 1
  error (...args: any[]) {
    if (this.options.logLevel < 1) {
      return
    }
    process.exitCode = process.exitCode || 1
    console.error(chalk.red('error'), ...args)
  }

  // level: 3
  success (...args: any[]) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('green', 'success', ...args)
  }

  // level: 3
  tip (...args: any[]) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('blue', 'tip', ...args)
  }

  // level: 3
  info (...args: any[]) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('cyan', 'info', ...args)
  }

  wait (...args: any[]) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('cyan', 'wait', ...args)
  }

  // level: 3
  status (color: string, label: string, ...args: any[]) {
    if (this.options.logLevel < 3) {
      return
    }
    // @ts-ignore
    console.log(chalk[color](label), ...args)
  }

  developer (...args: any[]) {
    if (process.env.VUEPRESS_ENV !== 'developer' && !process.argv.includes('--developer')) {
      return
    }
    this.status('cyan', 'developer', ...args)
  }
}

/**
 * Expose a logger instance.
 */

export = new Logger()

