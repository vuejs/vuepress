'use strict'

/**
 * Module dependencies.
 */

const { logger, chalk, compose, datatypes: { isFunction }} = require('@vuepress/shared-utils')

/**
 * Expose synchronous option class.
 */

class Option {
  constructor (key) {
    this.key = key
    this.items = []
  }

  /**
   * Set value with name.
   *
   * @param {string} name
   * @param {T} value
   * @api public
   */

  add (name, value) {
    if (Array.isArray(value)) {
      return this.items.push(...value.map(i => ({ value: i, name })))
    }
    this.items.push({ value, name })
  }

  /**
   * Delete value with name.
   *
   * @param {string} name
   * @api public
   */

  delete (name) {
    let index = this.items.findIndex(({ name: _name }) => _name === name)
    while (index !== -1) {
      this.items.splice(index, 1)
      index = this.items.findIndex(({ name: _name }) => _name === name)
    }
  }

  /**
   * Clean option store
   *
   * @param {string} name
   * @api public
   */

  clear (name) {
    this.items = []
  }

  /**
   * Get values.
   *
   * @returns {any<T>}
   * @api public
   */

  get values () {
    return this.items.map(item => item.value)
  }

  /**
   * Get applied values
   *
   * @returns {Array|*|any[]}
   * @api public
   */

  get appliedValues () {
    return this.appliedItems && this.appliedItems.map(item => item.value)
  }

  /**
   * Get entries.
   *
   * @returns {any<T>}
   * @api public
   */

  get entries () {
    return this.items.map(({ name, value }) => ([name, value]))
  }

  /**
   * Synchronous running
   *
   * @param {Array<Function>} args
   * @api public
   */

  syncApply (...args) {
    const rawItems = this.items
    this.items = []
    this.appliedItems = this.items

    for (const { name, value } of rawItems) {
      try {
        this.add(
          name,
          isFunction(value)
            ? value(...args)
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
   * Process a value via a pipeline.
   * @param input
   * @returns {*}
   */

  pipeline (input) {
    const fn = compose(this.values)
    return fn(input)
  }
}

Option.prototype.apply = Option.prototype.syncApply
module.exports = Option
