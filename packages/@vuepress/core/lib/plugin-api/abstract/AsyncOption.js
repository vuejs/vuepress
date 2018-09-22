'use strict'

/**
 * Module dependencies.
 */

const { logger, chalk, datatypes: { isFunction }} = require('@vuepress/shared-utils')
const Option = require('./Option')

/**
 * Expose Asynchronous Option.
 */

class AsyncOption extends Option {
  /**
   * Asynchronous serial running
   * @param args
   * @param {Array<AsyncFunction>} args
   */

  async asyncApply (...args) {
    const items = []
    for (const { name, value } of this.items) {
      try {
        items.push({
          name,
          value: isFunction(value)
            ? await value(...args)
            : value
        })
      } catch (error) {
        logger.error(`${chalk.cyan(name)} apply ${chalk.cyan(this.key)} failed.`)
        throw error
      }
    }
    this.appliedItems = items
  }

  /**
   * Asynchronous serial running
   * @param args
   * @param {Array<AsyncFunction>} args
   */

  async parallelApply (...args) {
    const items = []
    await Promise.all(this.items.map(async ({ name, value }) => {
      try {
        items.push({
          name,
          value: isFunction(value)
            ? await value(...args)
            : value
        })
      } catch (error) {
        logger.error(`${chalk.cyan(name)} apply ${chalk.cyan(this.key)} failed.`)
        throw error
      }
    })).catch(error => {
      throw error
    })
    return items
  }
}

AsyncOption.prototype.apply = AsyncOption.prototype.asyncApply
module.exports = AsyncOption
