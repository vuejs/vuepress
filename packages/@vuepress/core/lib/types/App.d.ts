import { Config } from './options'
import { PageOptions } from './Page'

export interface AppOptions {

}

export interface SiteConfig {
  /**
   * The base URL the site will be deployed at. You will
   * need to set this if you plan to deploy your site
   * under a sub path, for example, GitHub pages. If you
   * plan to deploy your site to `https://foo.github.io/bar/`,
   * then `base` should be set to `"/bar/"`. It should
   * always start and end with a slash. The `base` is
   * automatically prepended to all the URLs that start
   * with `/` in other options, so you only need to specify it once.
   */
  base: string

  /**
   * Title for the site.
   * This will be the prefix for all page titles,
   * and displayed in the navbar in the default theme.
   */
  title: string

  /**
   * Description for the site.
   * This will be rendered as a <meta> tag in the page HTML.
   */
  description: string

  /**
   * Extra tags to be injected to the page HTML `<head>`.
   * Each tag can be specified in the form of
   * `[tagName, { attrName: attrValue }, innerHTML?]`.
   */
  head: [string, Record<string, string>, string?][]
}

export interface SiteData extends SiteConfig {
  pages: PageOptions[]
  themeConfig: Config
  locales: Record<string, SiteData>
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
