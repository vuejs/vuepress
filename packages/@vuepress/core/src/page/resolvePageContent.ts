import {
  preprocessMarkdownContent,
  PreprocessMarkdownContentResult,
  preprocessVueContent,
} from '@vuepress/utils'

export const resolvePageContent = (
  rawContent: string,
  filePath: string | null
): PreprocessMarkdownContentResult => {
  if (rawContent && filePath) {
    if (filePath.endsWith('.md')) {
      return preprocessMarkdownContent(rawContent)
    } else if (filePath.endsWith('.vue')) {
      return preprocessVueContent(rawContent)
    }
  }

  return {
    content: '',
    frontmatter: {},
    excerpt: '',
  }
}
