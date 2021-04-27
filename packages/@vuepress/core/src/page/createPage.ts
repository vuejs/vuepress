import type { App, Page, PageOptions } from '../types'
import { inferPagePath } from './inferPagePath'
import { resolvePageComponentInfo } from './resolvePageComponentInfo'
import { resolvePageContent } from './resolvePageContent'
import { resolvePageDataInfo } from './resolvePageDataInfo'
import { resolvePageDate } from './resolvePageDate'
import { resolvePageExcerpt } from './resolvePageExcerpt'
import { resolvePageFileContent } from './resolvePageFileContent'
import { resolvePageFilePath } from './resolvePageFilePath'
import { resolvePageFrontmatter } from './resolvePageFrontmatter'
import { resolvePageHtmlInfo } from './resolvePageHtmlInfo'
import { resolvePageKey } from './resolvePageKey'
import { resolvePageLang } from './resolvePageLang'
import { resolvePagePath } from './resolvePagePath'
import { resolvePagePermalink } from './resolvePagePermalink'
import { resolvePageSlug } from './resolvePageSlug'
import { resolvePageTitle } from './resolvePageTitle'

export const createPage = async (
  app: App,
  options: PageOptions
): Promise<Page> => {
  // resolve page file absolute path and relative path
  const { filePath, filePathRelative } = resolvePageFilePath({
    app,
    options,
  })

  // read the raw file content according to the absolute file path
  const contentRaw = await resolvePageFileContent({ filePath, options })

  // resolve content & frontmatter & raw excerpt from raw content
  const { content, frontmatterRaw, excerptRaw } = resolvePageContent({
    contentRaw,
  })

  // resolve frontmatter from raw frontmatter and page options
  const frontmatter = resolvePageFrontmatter({ frontmatterRaw, options })

  // resolve excerpt from raw excerpt
  const excerpt = resolvePageExcerpt({
    app,
    excerptRaw,
    filePathRelative,
    frontmatter,
  })

  // resolve slug from file path
  const slug = resolvePageSlug({ filePathRelative })

  // resolve date from file path
  const date = resolvePageDate({ frontmatter, filePathRelative })

  // infer page path according to file path
  const { pathInferred, pathLocale } = inferPagePath({ app, filePathRelative })

  // resolve language from frontmatter and site options
  const lang = resolvePageLang({ app, frontmatter, pathLocale })

  // resolve page permalink
  const permalink = resolvePagePermalink({
    frontmatter,
    slug,
    date,
    pathInferred,
    pathLocale,
  })

  // resolve page path
  const path = resolvePagePath({ permalink, pathInferred, options })

  // resolve path key
  const key = resolvePageKey({ path })

  // resolve page rendered html file path
  const { htmlFilePath, htmlFilePathRelative } = resolvePageHtmlInfo({
    app,
    path,
  })

  // resolve page component and extract headers & links
  const {
    headers,
    links,
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
    componentFileChunkName,
  } = await resolvePageComponentInfo({
    app,
    content,
    filePathRelative,
    frontmatter,
    htmlFilePathRelative,
    key,
  })

  const {
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
  } = resolvePageDataInfo({ app, key })

  // resolve title from frontmatter and headers
  const title = resolvePageTitle({ content, frontmatter, headers })

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
    componentFileChunkName,
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
    htmlFilePath,
    htmlFilePathRelative,
    title,
    content,
    frontmatter,
    excerpt,
    headers,
    links,
    slug,
    date,
    lang,
  }
}
