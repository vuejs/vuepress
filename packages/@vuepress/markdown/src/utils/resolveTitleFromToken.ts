import * as Token from 'markdown-it/lib/token'
import { htmlEscape } from '@vuepress/shared'

/**
 * Resolve header title from markdown-it token
 *
 * Typically using the next token of `heading_open` token
 */
export const resolveTitleFromToken = (
  token: Token,
  {
    allowHtml,
    escapeText,
  }: {
    allowHtml: boolean
    escapeText: boolean
  }
): string => {
  // children of the token contains the parsed result of the heading title
  const children = token.children ?? []

  // type of tokens to be included in the heading title
  const titleTokenTypes = ['text', 'emoji', 'code_inline']

  // include 'html_inline' or not
  if (allowHtml) {
    titleTokenTypes.push('html_inline')
  }

  // filter the token type to be included in the title
  const titleTokens = children.filter((item) =>
    titleTokenTypes.includes(item.type)
  )

  // get title from tokens
  return titleTokens
    .reduce((result, item) => {
      if (escapeText) {
        // escape the content of 'code_inline' and 'text'
        if (item.type === 'code_inline' || item.type === 'text') {
          return `${result}${htmlEscape(item.content)}`
        }
      }

      // keep the content of 'emoji' and 'html_inline'
      return `${result}${item.content}`
    }, '')
    .trim()
}
