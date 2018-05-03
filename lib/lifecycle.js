const { EventEmitter } = require('events')

const HOOK_NAMES = ['ready', 'compiled', 'updated']

class VuePressHook extends EventEmitter {
  constructor () {
    super()
    HOOK_NAMES.forEach(hook => {
      const handlerKey = `_${hook}Handlers`
      const execKey = `notify${hook.charAt(0).toUpperCase() + hook.slice(1)}`

      this[handlerKey] = []

      // public, Add hook handler
      this[hook] = (handler) => {
        this[handlerKey].push(handler.bind(this))
        return this
      }

      // private, Execute hook handler
      this[execKey] = async (...args) => {
        for (const handler of this[handlerKey]) {
          await handler(...args)
        }
      }
    })
  }

  isEmpty (hook) {
    return this[`_${hook}Handlers`].length === 0
  }
}

module.exports = new VuePressHook()
