import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
} from '@vuepress/markdown'
import type { App, PageFrontmatter } from '../types'

/**
 * Render page content and extract related info
 */
export const renderPageContent = async ({
  app,
  content,
  frontmatter,
  filePath,
  filePathRelative,
}: {
  app: App
  content: string
  frontmatter: PageFrontmatter
  filePath: string | null
  filePathRelative: string | null
}): Promise<{
  renderedContent: string
  deps: string[]
  headers: MarkdownHeader[]
  hoistedTags: string[]
  links: MarkdownLink[]
  title: string
}> => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter,
  }

  const renderedContent = app.markdown.render(content, markdownEnv)

  /* istanbul ignore next */
  const {
    headers = [],
    hoistedTags = [],
    importedFiles = [],
    links = [],
    title = '',
  } = markdownEnv

  return {
    renderedContent,
    deps: importedFiles,
    headers,
    hoistedTags,
    links,
    title,
  }
}
