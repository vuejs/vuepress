import { Config } from './options'
import { PageOptions } from './Page'

export interface AppOptions {

}

export interface SiteData {
  title: string
  description: string
  base: string
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

  /** load theme and plugins */
  process(): Promise<void>

  /** add a page */
  addPage(options: PageOptions): Promise<void>

  /** get siteData */
  getSiteData(): SiteData

  /** write a file to tempPath */
  writeTemp(file: string, content: string): Promise<string>
}
