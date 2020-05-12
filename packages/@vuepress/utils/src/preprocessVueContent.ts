import { parse } from '@vue/compiler-sfc'
import {
  preprocessMarkdownContent,
  PreprocessMarkdownContentResult,
} from './preprocessMarkdownContent'

export const preprocessVueContent = (
  rawContent: string
): PreprocessMarkdownContentResult => {
  const {
    descriptor: { customBlocks },
  } = parse(rawContent, {
    sourceMap: false,
  })

  const frontmatterBlock = customBlocks.find(
    ({ type }) => type === 'frontmatter'
  )

  const frontmatterContent = frontmatterBlock?.content || ''

  return preprocessMarkdownContent(`---\n${frontmatterContent}\n---`)
}
