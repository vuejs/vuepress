import App from './App'
import Mixin from './Mixin'
import Frontmatter from './Frontmatter'

export interface PageOptions {
  path: string
  
  title: string

  content: string

  filePath: string

  relative: string

  permalink: string

  frontmatter?: Frontmatter

  permalinkPattern?: string
}

export default class Page {
  _filePath: string

  _computed: Mixin

  _content: string

  _strippedContent: string

  key: string

  frontmatter: Frontmatter

  regularPath: string

  path: string

  context: App

  constructor(options: PageOptions, context: App)
}
