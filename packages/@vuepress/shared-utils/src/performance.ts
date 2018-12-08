import os from 'os'

class Performance {
  // @ts-ignore
  private _totalMemory: number
  private _startFreeMemory: number
  private _endFreeMemory: number
  private _startTime: number
  private _endTime: number

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

export = new Performance()
