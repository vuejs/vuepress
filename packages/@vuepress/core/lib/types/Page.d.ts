import App from './App'
import Mixin from './Mixin'
import Frontmatter from './Frontmatter'

export interface PageInfo {
  /**
   * Server: absolute page path.
   * 
   * Client: path url relative to `base`.
   */
  path: string
  
  /**
   * Page title.
   */
  title: string

  /**
   * Page frontmatter.
   */
  frontmatter: Frontmatter
}

interface PageInstance extends PageInfo {
  /**
   * Page key. Used for `Vue.component`.
   */
  key: string

  /**
   * Page url based on `relativePath`, which can be overriden by permalink.
   */
  regularPath?: string

  /**
   * Page path relative to `sourceDir`.
   */
  relativePath?: string
}

export interface PageOptions extends Partial<PageInfo> {
  meta?: Record<string, string>[]

  content?: string

  filePath?: string

  relative?: string

  permalink?: string

  permalinkPattern?: string
}

export default class Page implements PageInstance {
  _filePath: string

  _computed: Mixin

  _content: string

  _strippedContent: string

  _context: App
  
  key: string
  path: string
  title: string
  regularPath: string
  relativePath: string
  frontmatter: Frontmatter

  constructor(options: PageOptions, context: App)
}

export interface ClientPage extends PageInstance {
  headers: {
    level: number
    title: string
    slug: string
  }[]
}
