import { SiteData } from './App'
import { ThemeConfig } from './options'
import Frontmatter from './Frontmatter'

export default class ClientComputedMixin {
  public $site: SiteData
  
  public $themeConfig: ThemeConfig

  public $frontmatter: Frontmatter

  public $localeConfig: any // TODO

  public $siteTitle: string

  public $title: string

  public $description: string

  public $lang: string

  public $localePath: string

  public $themeLocaleConfig: any // TODO

  public $page: any // TODO
}
