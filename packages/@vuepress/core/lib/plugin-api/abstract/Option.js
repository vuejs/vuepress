'use strict'

/**
 * Module dependencies.
 */

const { logger, chalk, compose, datatypes: { isFunction }} = require('@vuepress/shared-utils')

/**
 * Expose Option.
 */

class Option {
  constructor (key) {
    this.key = key
    this.items = []
  }

  /**
   * Set value with name.
   * @param {string} name
   * @param {T} value
   */

  add (name, value) {
    if (Array.isArray(value)) {
      return this.items.push(...value.map(i => ({ value: i, name })))
    }
    this.items.push({ value, name })
  }

  /**
   * Delete value with name.
   * @param {string} name
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
   * @param {string} name
   */

  clear (name) {
    this.items = []
  }

  /**
   * Get values.
   * @returns {any<T>}
   */

  get values () {
    return this.items.map(item => item.value)
  }

  /**
   *
   * @returns {Array|*|any[]}
   */

  get appliedValues () {
    return this.appliedItems && this.appliedItems.map(item => item.value)
  }

  /**
   * Get values.
   * @returns {any<T>}
   */

  get entries () {
    return this.items.map(({ name, value }) => ([name, value]))
  }

  /**
   * Synchronous running
   * @param {Array<Function>} args
   */

  syncApply (...args) {
    const items = []
    for (const { name, value } of this.items) {
      try {
        items.push({
          name,
          value: isFunction(value)
            ? value(...args)
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
