import * as Token from 'markdown-it/lib/token'
import { htmlEscape, isFunction } from '@vuepress/shared'
import { MarkdownHeader } from '../types'

/**
 * Resolve headers from markdown-it tokens
 */
export const resolveHeadersFromTokens = (
  tokens: Token[],
  {
    level,
    allowHtml,
    escapeText,
    slugify,
    format,
  }: {
    level: number[]
    allowHtml: boolean
    escapeText: boolean
    slugify: (str: string) => string
    format?: (str: string) => string
  }
): MarkdownHeader[] => {
  // store the result of headers
  const headers: MarkdownHeader[] = []

  // a temp headers stack for generating the headers tree
  const stack: MarkdownHeader[] = []

  // push a header to the headers tree
  const push = (header: MarkdownHeader): void => {
    while (stack.length !== 0 && header.level <= stack[0].level) {
      stack.shift()
    }

    if (stack.length === 0) {
      headers.push(header)
      stack.push(header)
    } else {
      stack[0].children.push(header)
      stack.unshift(header)
    }
  }

  tokens.forEach((_, idx) => {
    const token = tokens[idx]

    // if the token type is not matched, skip
    if (token?.type !== 'heading_open') {
      return
    }

    // get the level from the tag, h1 -> 1
    const headerLevel = Number.parseInt(token.tag.slice(1), 10)

    // if the level should not be extracted, skip
    if (!level.includes(headerLevel)) {
      return
    }

    // the next token of 'heading_open' contains the heading content
    const nextToken = tokens[idx + 1]

    // if the next token does not exist, skip
    if (!nextToken) {
      return
    }

    // children of the next token contains the parsed result of the heading title
    const nextTokenChildren = nextToken.children ?? []

    // filter tokens for generating heading title
    // 'text' and 'code_inline' should be escaped to avoid being treated as html
    // 'emoji' and 'html_inline' should be used directly
    const titleTokenTypes = ['text', 'emoji', 'code_inline']

    // include 'html_inline' or not
    if (allowHtml) {
      titleTokenTypes.push('html_inline')
    }

    const titleTokens = nextTokenChildren.filter((item) =>
      titleTokenTypes.includes(item.type)
    )

    // get title from tokens
    const title = titleTokens
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

    // the id of the heading anchor is the slugify result of markdown-it-anchor
    // if the id does not exist, slugify the title ourselves
    const slug = token.attrGet('id') ?? slugify(title)

    // push the header to tree
    push({
      level: headerLevel,
      title: isFunction(format) ? format(title) : title,
      slug,
      children: [],
    })
  })

  return headers
}
