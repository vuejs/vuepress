import type { App, Page, PageOptions } from '../types'
import { inferPagePath } from './inferPagePath'
import { resolvePageComponent } from './resolvePageComponent'
import { resolvePageContent } from './resolvePageContent'
import { resolvePageDate } from './resolvePageDate'
import { resolvePageExcerpt } from './resolvePageExcerpt'
import { resolvePageFile } from './resolvePageFile'
import { resolvePageKey } from './resolvePageKey'
import { resolvePagePath } from './resolvePagePath'
import { resolvePagePermalink } from './resolvePagePermalink'
import { resolvePageSlug } from './resolvePageSlug'
import { resolvePageTitle } from './resolvePageTitle'

export const createPage = async (
  app: App,
  options: PageOptions
): Promise<Page> => {
  // 1. resolve page file path and content
  const { filePath, filePathRelative, fileContent } = await resolvePageFile(
    app,
    options
  )

  // resolve content & frontmatter & raw excerpt from raw content
  const { frontmatter, content, excerpt: rawExcerpt } = resolvePageContent(
    fileContent
  )

  // resolve title from content
  const title = resolvePageTitle(frontmatter, content)

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
  const { pathInferred, pathLocale } = inferPagePath(app, filePathRelative)

  // resolve page permalink
  const permalink = resolvePagePermalink(
    options,
    frontmatter,
    slug,
    date,
    pathInferred,
    pathLocale
  )

  // resolve page path
  const path = resolvePagePath(permalink, pathInferred)

  // resolve path key
  const key = resolvePageKey(path)

  const {
    headers,
    links,
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
  } = await resolvePageComponent(app, content, filePathRelative, path)

  return {
    key,
    path,
    pathInferred,
    pathLocale,
    filePath,
    filePathRelative,
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
    title,
    content,
    frontmatter,
    excerpt,
    headers,
    links,
    slug,
    date,
  }
}
