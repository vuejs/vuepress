import { ThemeConfig, OptionAPI } from './options'
import { PageOptions } from './Page'

export interface AppOptions {

}

export interface SiteConfig extends OptionAPI {
  /**
   * The base URL the site will be deployed at. You will need
   * to set this if you plan to deploy your site under a sub
   * path, for example, GitHub pages. If you plan to deploy your
   * site to `https://foo.github.io/bar/`, then `base` should be
   * set to `"/bar/"`. It should always start and end with a slash.
   */
  base?: string

  /**
   * Title for the site. This will be the prefix for all page titles,
   * and displayed in the navbar in the default theme.
   */
  title?: string

  /**
   * Description for the site.
   * This will be rendered as a `<meta>` tag in the page HTML.
   */
  description?: string

  /**
   * Extra tags to be injected to the page HTML `<head>`.
   * Each tag can be specified in the form of
   * `[tagName, { attrName: attrValue }, innerHTML?]`.
   */
  head?: [string, Record<string, string>, string?][]

  /**
   * [Dev Only] Specify the host to use for the dev server.
   */
  host?: string

  /**
   * [Dev Only] Specify the port to use for the dev server.
   */
  port?: number

  /**
   * Specify the temporary directory for client.
   */
  temp?: string

  /**
   * Specify the output directory for vuepress build. If a relative
   * path is specified,it will be resolved based on `process.cwd()`.
   */
  dest?: string

  /**
   * Specify locales for i18n support.
   */
  locales?: Record<string, SiteData>

  /**
   * A function to control what files should have
   * `<link rel="preload">` resource hints generated.
   * @param file file name
   * @param type file type
   */
  shouldPrefetch?(file: string, type: string): boolean

  /**
   * Specify the path to the cache, or remove the
   * cache before each build by setting it to false.
   */
  cache?: string | boolean

  /**
   * Specify this to use a custom theme.
   */
  theme?: string

  /**
   * Provide config options to the used theme.
   * The options will vary depending on the theme you are using.
   */
  themeConfig?: ThemeConfig

  /**
   * Options for markdown rendering.
   */
  markdown?: Record<string, any> // TODO

  /**
   * Options for postcss-loader.
   * 
   * Note: specifying this value will overwrite autoprefixer
   * and you will need to include it yourself.
   */
  postcss?: any

  /**
   * Options for stylus-loader.
   */
  stylus?: any

  /**
   * Options for sass-loader to load `*.scss` files.
   */
  scss?: any

  /**
   * Options for sass-loader to load `*.sass` files.
   */
  sass?: any

  /**
   * Options for less-loader.
   */
  less?: any

  /**
   * Set to true if you are only targeting evergreen browsers.
   * This will disable ES5 transpilation and polyfills for IE,
   * and result in faster builds and smaller files.
   */
  evergreen?: boolean
}

export interface SiteData extends SiteConfig {
  pages: PageOptions[]
}

/** VuePress App */
export default class App {
  public options: AppOptions

  public sourceDir: string

  public tempPath: string

  public vuepressDir: string

  constructor(options?: AppOptions)

  /**
   * load theme and plugins 
   */
  process(): Promise<void>

  /**
   * add a page 
   */
  addPage(options: PageOptions): Promise<void>

  /**
   * get siteData 
   */
  getSiteData(): SiteData

  /**
   * write a file to tempPath 
   */
  writeTemp(file: string, content: string): Promise<string>
}
