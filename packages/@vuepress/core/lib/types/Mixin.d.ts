import { SiteData } from './App'
import { ThemeConfig } from './options'
import Frontmatter from './Frontmatter'
import Page from './Page'

export default class ClientComputedMixin {
  /**
   * Current site data.
   */
  public $site: SiteData
  
  /**
   * Current theme config.
   */
  public $themeConfig: ThemeConfig

  /**
   * i.e. `page.frontmatter`.
   */
  public $frontmatter: Frontmatter

  /**
   * Current locale site data.
   */
  public $localeConfig: SiteData

  /**
   * Current site title.
   */
  public $siteTitle: string

  /**
   * Value of the `<title>` label used for the current page.
   */
  public $title: string

  /**
   * The content value of the `<meta name= "description" content= "...">` for the current page.
   */
  public $description: string

  /**
   * The language of the current page, the default value is `en-US`.
   */
  public $lang: string

  /**
   * The locale path prefix for the current page, the default value is `/`.
   */
  public $localePath: string

  /**
   * Current locale theme config.
   */
  public $themeLocaleConfig: ThemeConfig

  /**
   * Current page information.
   */
  public $page: Page
}
