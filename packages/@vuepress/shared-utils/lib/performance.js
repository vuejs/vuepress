const os = require('os')

class Performance {
  constructor () {
    this._totalMemory = os.totalmem()
  }

  start () {
    this._startTime = Date.now()
    this._startFreeMemory = os.freemem()
  }

  stop () {
    this._endTime = Date.now()
    this._endFreeMemory = os.freemem()
    return {
      duration: this._endTime - this._startTime,
      memoryDiff: this._endFreeMemory - this._startFreeMemory
    }
  }
}

module.exports = new Performance()
