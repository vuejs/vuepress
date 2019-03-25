import { ThemeConfig, ThemeOrConfigOptions } from './options'
import Page, { PageOptions } from './Page'
import { MarkdownConfig } from './markdown'

interface BaseOptions {
  /**
   * The base URL the site will be deployed at. You will need
   * to set this if you plan to deploy your site under a sub
   * path, for example, GitHub pages. If you plan to deploy your
   * site to `https://foo.github.io/bar/`, then `base` should be
   * set to `"/bar/"`. It should always start and end with a slash.
   */
  base: string
}

interface ContextSharedOptions {
  /**
   * Root directory where the documents are located.
   */
  sourceDir: string

  /**
   * Site lever configuration (usually in `config.js`).
   */
  siteConfig: SiteConfig
}

interface AppSharedOptions {
  /**
   * Root directory where the temporary files are located.
   */
  temp?: string

  /**
   * Specify the output directory for vuepress build. If a relative
   * path is specified, it will be resolved based on `process.cwd()`.
   */
  dest?: string
}

export interface AppOptions extends AppSharedOptions, Partial<ContextSharedOptions> {}

interface SiteSharedOptions extends Partial<BaseOptions> {
  /**
   * Title for the site. This will be the prefix for all page titles,
   * and displayed in the navbar in the default theme.
   */
  title: string

  /**
   * Description for the site.
   * This will be rendered as a `<meta>` tag in the page HTML.
   */
  description: string

  /**
   * Specify locales for i18n support.
   */
  locales: Record<string, SiteData>

  /**
   * Config options for the used theme. The options
   * will vary depending on the theme you are using.
   */
  themeConfig: ThemeConfig
}

export interface SiteConfig extends ThemeOrConfigOptions, AppSharedOptions, Partial<SiteSharedOptions> {
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
   * Options for markdown rendering.
   */
  markdown?: MarkdownConfig

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

export interface SiteData extends SiteSharedOptions {
  /**
   * Contains a list of Page objects.
   */
  pages: Page[]
}

/**
 * VuePress App
 */
export default class App implements BaseOptions, ContextSharedOptions {
  public base: string
  public sourceDir: string
  public siteConfig: SiteConfig

  /**
   * Options for VuePress App.
   */
  public options: AppOptions

  /**
   * Root directory where the temporary files are located.
   */
  public tempPath: string

  /**
   * Output path.
   */
  public outDir: string

  /**
   * Path for `.vuepress` directory.
   */
  public vuepressDir: string

  /**
   * Whether VuePress run in production environment mode.
   */
  public isProd: boolean

  constructor(options?: AppOptions)

  /**
   * load theme and plugins 
   */
  public process(): Promise<void>

  /**
   * Add a page.
   */
  public addPage(options: PageOptions): Promise<void>

  /**
   * Get current `siteData`.
   */
  public getSiteData(): SiteData

  /**
   * Write a file to tempPath.
   */
  public writeTemp(file: string, content: string): Promise<string>
}
