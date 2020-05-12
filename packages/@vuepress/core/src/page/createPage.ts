import { App } from '../app'
import { inferPagePath } from './inferPagePath'
import { resolveFilePath } from './resolveFilePath'
import { resolveFileContent } from './resolveFileContent'
import { resolvePageContent } from './resolvePageContent'
import { resolvePageDate } from './resolvePageDate'
import { resolvePageExcerpt } from './resolvePageExcerpt'
import { resolvePageHeaders, PageHeader } from './resolvePageHeaders'
import { resolvePageKey } from './resolvePageKey'
import { resolvePagePath } from './resolvePagePath'
import { resolvePagePermalink } from './resolvePagePermalink'
import { resolvePageSlug } from './resolvePageSlug'
import { resolvePageTitle } from './resolvePageTitle'

export interface PageConfig {
  permalink?: string
  permalinkPattern?: string
  filePath?: string
  frontmatter?: PageFrontmatter
  content?: string
}

export type PageFrontmatter = Record<string, unknown>

export interface Page {
  /**
   * Identifier of the page
   *
   * Will also be used as the component name
   *
   * @example 'v-foobar'
   */
  key: string

  /**
   * Route path of the page
   *
   * Firstly inferred from the file path
   *
   * Might be overridden by permalink
   *
   * @example '/guide/index.html'
   * @example '/2020/02/02/hello-world.html'
   */
  path: string

  /**
   * Path of the page that inferred from file path
   *
   * If the page does not come from a file, it would be `null`
   *
   * @example '/guide/index.html'
   */
  pathInferred: string | null

  /**
   * Absolute path of the source file
   *
   * If the page does not come from a file, it would be `null`
   */
  filePath: string | null

  /**
   * Relative path of the source file
   *
   * If the page does not come from a file, it would be `null`
   */
  filePathRelative: string | null

  /**
   * Title of the page
   */
  title: string

  /**
   * Content of the page
   */
  content: string

  /**
   * Front matter of the page
   */
  frontmatter: PageFrontmatter

  /**
   * Excerpt of the page
   */
  excerpt: string

  /**
   * Headers of the page
   */
  headers: PageHeader[]

  /**
   * Slug of the page
   */
  slug: string

  /**
   * Date of the page
   */
  date: string
}

export const createPage = async (
  app: App,
  config: PageConfig
): Promise<Page> => {
  // resolve absolute path and relative path
  const { filePath, filePathRelative } = resolveFilePath(app, config)

  // resolve the raw content
  const rawContent = await resolveFileContent(config, filePath)

  // resolve content & frontmatter & raw excerpt from raw content
  const { content, frontmatter, excerpt: rawExcerpt } = resolvePageContent(
    rawContent,
    filePath
  )

  // resolve title from content
  const title = resolvePageTitle(frontmatter, content)

  // resolve headers from content
  const headers = resolvePageHeaders(app, content)

  // resolve excerpt from raw excerpt
  const excerpt = resolvePageExcerpt(
    rawExcerpt,
    app,
    frontmatter,
    filePathRelative
  )

  // resolve slug from file path
  const slug = resolvePageSlug(filePathRelative)

  // resolve date from file path
  const date = resolvePageDate(frontmatter, filePathRelative)

  // infer page path according to file path
  const pathInferred = inferPagePath(filePathRelative)

  // resolve page permalink
  const permalink = resolvePagePermalink(
    config,
    frontmatter,
    slug,
    date,
    pathInferred
  )

  // resolve page path
  const path = resolvePagePath(permalink, pathInferred)

  // resolve path key
  const key = resolvePageKey(path)

  return {
    key,
    path,
    pathInferred,
    filePath,
    filePathRelative,
    title,
    content,
    frontmatter,
    excerpt,
    headers,
    slug,
    date,
  }
}
