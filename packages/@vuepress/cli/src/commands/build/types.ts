export interface BuildCommandOptions {
  // app config
  dest?: string
  temp?: string
  cache?: string
  debug?: boolean

  // cli only
  config?: string
  cleanTemp?: boolean
  cleanCache?: boolean
}
