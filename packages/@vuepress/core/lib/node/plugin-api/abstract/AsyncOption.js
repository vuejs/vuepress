'use strict'

/**
 * Module dependencies.
 */

const { logger, chalk, datatypes: { isFunction }} = require('@vuepress/shared-utils')
const Option = require('./Option')

/**
 * Expose asynchronous option class.
 */

class AsyncOption extends Option {
  /**
   * Asynchronous serial running
   *
   * @param args
   * @param {Array<AsyncFunction>} args
   * @api public
   */

  async asyncApply (...args) {
    const rawItems = this.items
    this.items = []
    this.appliedItems = this.items

    for (const { name, value } of rawItems) {
      try {
        this.add(
          name,
          isFunction(value)
            ? await value(...args)
            : value
        )
      } catch (error) {
        logger.error(`${chalk.cyan(name)} apply ${chalk.cyan(this.key)} failed.`)
        throw error
      }
    }

    this.items = rawItems
  }

  /**
   * Asynchronous serial running
   *
   * @param args
   * @param {Array<AsyncFunction>} args
   * @api public
   */

  async parallelApply (...args) {
    const rawItems = this.items
    this.items = []
    this.appliedItems = this.items

    await Promise.all(rawItems.map(async ({ name, value }) => {
      try {
        this.add(
          name,
          isFunction(value)
            ? await value(...args)
            : value
        )
      } catch (error) {
        logger.error(`${chalk.cyan(name)} apply ${chalk.cyan(this.key)} failed.`)
        throw error
      }
    })).catch(error => {
      throw error
    })

    this.items = rawItems
  }

  /**
   * Process a value via a pipeline.
   *
   * @param input
   * @returns {any}
   * @api public
   */

  async pipeline (input) {
    for (const fn of this.values) {
      input = await fn(input)
    }
    return input
  }
}

AsyncOption.prototype.apply = AsyncOption.prototype.asyncApply
module.exports = AsyncOption
