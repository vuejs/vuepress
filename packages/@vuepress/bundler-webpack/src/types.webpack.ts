import type { Compiler, ModuleOptions } from 'webpack'

// Forked and modified from @types/webpack@4.41.23
// Because current types definitions of webpack 5 is not complete

export interface StatsToJsonOutput {
  _showErrors: boolean
  _showWarnings: boolean
  assets?: Array<{
    chunks: Array<number | string>
    chunkNames: string[]
    emitted: boolean
    isOverSizeLimit?: boolean
    name: string
    size: number
  }>
  assetsByChunkName?: Record<string, string | string[]>
  builtAt?: number
  children?: Array<StatsToJsonOutput & { name?: string }>
  chunks?: Array<{
    children: number[]
    childrenByOrder: Record<string, number[]>
    entry: boolean
    files: string[]
    filteredModules?: number
    hash?: string
    id: number | string
    initial: boolean
    modules?: FnModules[]
    names: string[]
    origins?: Array<{
      moduleId?: string | number
      module: string
      moduleIdentifier: string
      moduleName: string
      loc: string
      request: string
      reasons: string[]
    }>
    parents: number[]
    reason?: string
    recorded?: boolean
    rendered: boolean
    size: number
    siblings: number[]
  }>
  entrypoints?: Record<string, ChunkGroup>
  errors: string[]
  env?: Record<string, any>
  filteredAssets?: number
  filteredModules?: boolean
  hash?: string
  modules?: FnModules[]
  namedChunkGroups?: Record<string, ChunkGroup>
  needAdditionalPass?: boolean
  outputPath?: string
  publicPath?: string
  time?: number
  version?: string
  warnings: string[]
}

export interface FnModules {
  assets?: string[]
  built: boolean
  cacheable: boolean
  chunks: Array<number | string>
  depth?: number
  errors: number
  failed: boolean
  filteredModules?: boolean
  id: number | string
  identifier: string
  index: number
  index2: number
  issuer: string | undefined
  issuerId: number | string | undefined
  issuerName: string | undefined
  issuerPath: Array<{
    id: number | string
    identifier: string
    name: string
    profile: any // TODO
  }>
  modules: FnModules[]
  name: string
  optimizationBailout?: string
  optional: boolean
  prefetched: boolean
  profile: any // TODO
  providedExports?: any // TODO
  reasons: Reason[]
  size: number
  source?: string
  usedExports?: boolean
  warnings: number
}

export interface ChunkGroup {
  assets: { name: string }[]
  chunks: Array<number | string>
  children: Record<
    string,
    {
      assets: string[]
      chunks: Array<number | string>
      name: string
    }
  >
  childAssets: Record<string, string[]>
  isOverSizeLimit?: boolean
}

export interface Reason {
  moduleId: number | string | null
  moduleIdentifier: string | null
  module: string | null
  moduleName: string | null
  type: string
  explanation?: string
  userRequest: string
  loc: string
}

export interface LoaderContext {
  /**
   * Loader API version. Currently 2.
   * This is useful for providing backwards compatibility.
   * Using the version you can specify custom logic or fallbacks for breaking changes.
   */
  version: string

  /**
   *  The directory of the module. Can be used as context for resolving other stuff.
   *  In the example: /abc because resource.js is in this directory
   */
  context: string

  /**
   * Starting with webpack 4, the formerly `this.options.context` is provided as `this.rootContext`.
   */
  rootContext: string

  /**
   * The resolved request string.
   * In the example: "/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"
   */
  request: string

  /**
   *  A string or any object. The query of the request for the current loader.
   */
  query: any

  /**
   * A data object shared between the pitch and the normal phase.
   */
  data?: any

  callback: LoaderCallback

  /**
   * Make this loader async.
   */
  async(): LoaderCallback | undefined

  /**
   *  Make this loader result cacheable. By default it's not cacheable.
   *  A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed.
   *  This means the loader shouldn't have other dependencies than specified with this.addDependency.
   *  Most loaders are deterministic and cacheable.
   */
  cacheable(flag?: boolean): void

  /**
   * An array of all the loaders. It is writeable in the pitch phase.
   * loaders = [{request: string, path: string, query: string, module: function}]
   *
   * In the example:
   * [
   *   { request: "/abc/loader1.js?xyz",
   *     path: "/abc/loader1.js",
   *     query: "?xyz",
   *     module: [Function]
   *   },
   *   { request: "/abc/node_modules/loader2/index.js",
   *     path: "/abc/node_modules/loader2/index.js",
   *     query: "",
   *     module: [Function]
   *   }
   * ]
   */
  loaders: any[]

  /**
   * The index in the loaders array of the current loader.
   * In the example: in loader1: 0, in loader2: 1
   */
  loaderIndex: number

  /**
   * The resource part of the request, including query.
   * In the example: "/abc/resource.js?rrr"
   */
  resource: string

  /**
   * The resource file.
   * In the example: "/abc/resource.js"
   */
  resourcePath: string

  /**
   * The query of the resource.
   * In the example: "?rrr"
   */
  resourceQuery: string

  /**
   * Emit a warning.
   */
  emitWarning(message: string | Error): void

  /**
   * Emit a error.
   */
  emitError(message: string | Error): void

  /**
   * Execute some code fragment like a module.
   *
   * Don't use require(this.resourcePath), use this function to make loaders chainable!
   *
   */
  exec(code: string, filename: string): any

  /**
   * Resolves the given request to a module, applies all configured loaders and calls
   * back with the generated source, the sourceMap and the module instance (usually an
   * instance of NormalModule). Use this function if you need to know the source code
   * of another module to generate the result.
   */
  loadModule(
    request: string,
    callback: (
      err: Error | null,
      source: string,
      sourceMap: RawSourceMap,
      module: ModuleOptions
    ) => void
  ): any

  /**
   * Resolve a request like a require expression.
   */
  resolve(
    context: string,
    request: string,
    callback: (err: Error, result: string) => void
  ): any

  /**
   * Resolve a request like a require expression.
   */
  resolveSync(context: string, request: string): string

  /**
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   */
  addDependency(file: string): void

  /**
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   */
  dependency(file: string): void

  /**
   * Add a directory as dependency of the loader result.
   */
  addContextDependency(directory: string): void

  /**
   * Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using pitch.
   */
  clearDependencies(): void

  /**
   * Pass values to the next loader.
   * If you know what your result exports if executed as module, set this value here (as a only element array).
   */
  value: any

  /**
   * Passed from the last loader.
   * If you would execute the input argument as module, consider reading this variable for a shortcut (for performance).
   */
  inputValue: any

  /**
   * A boolean flag. It is set when in debug mode.
   */
  debug: boolean

  /**
   * Should the result be minimized.
   */
  minimize: boolean

  /**
   * Should a SourceMap be generated.
   */
  sourceMap: boolean

  /**
   * Target of compilation. Passed from configuration options.
   * Example values: "web", "node"
   */
  target:
    | 'web'
    | 'webworker'
    | 'async-node'
    | 'node'
    | 'electron-main'
    | 'electron-renderer'
    | 'node-webkit'
    | string

  /**
   * This boolean is set to true when this is compiled by webpack.
   *
   * Loaders were originally designed to also work as Babel transforms.
   * Therefore if you write a loader that works for both, you can use this property to know if
   * there is access to additional loaderContext and webpack features.
   */
  webpack: boolean

  /**
   * Emit a file. This is webpack-specific.
   */
  emitFile(name: string, content: Buffer | string, sourceMap: any): void

  /**
   * Access to the compilation's inputFileSystem property.
   */
  fs: any

  /**
   * Which mode is webpack running.
   */
  mode: 'production' | 'development' | 'none'

  /**
   * Hacky access to the Compilation object of webpack.
   */
  _compilation: any

  /**
   * Hacky access to the Compiler object of webpack.
   */
  _compiler: Compiler

  /**
   * Hacky access to the Module object being loaded.
   */
  _module: any

  /** Flag if HMR is enabled */
  hot: boolean
}

export type LoaderCallback = (
  err: Error | undefined | null,
  content?: string | Buffer,
  sourceMap?: RawSourceMap
) => void

export interface StartOfSourceMap {
  file?: string
  sourceRoot?: string
}

export interface RawSourceMap extends StartOfSourceMap {
  version: string
  sources: string[]
  names: string[]
  sourcesContent?: string[]
  mappings: string
}
