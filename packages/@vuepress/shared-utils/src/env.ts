class ENV {
  isDebug: boolean;
  isTest: boolean;
  isProduction: boolean;

  constructor () {
    this.isDebug = false
    this.isTest = false
    this.isProduction = false
  }

  setOptions (options: Record<string, boolean>) {
    Object.assign(this, options)
  }
}

export = new ENV()
