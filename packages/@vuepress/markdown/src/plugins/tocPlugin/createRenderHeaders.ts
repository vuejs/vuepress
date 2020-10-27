import { htmlEscape } from '@vuepress/shared'
import type { MarkdownHeader } from '../../types'
import type { TocPluginOptions } from './tocPlugin'

type RenderHeadersFn = (headers: MarkdownHeader[]) => string

export const createRenderHeaders = ({
  listTag,
  listClass,
  itemClass,
  linkTag,
  linkClass,
}: Pick<
  Required<TocPluginOptions>,
  'listTag' | 'listClass' | 'itemClass' | 'linkTag' | 'linkClass'
>): RenderHeadersFn => {
  const listTagString = htmlEscape(listTag)
  const listClassString = listClass ? ` class="${htmlEscape(listClass)}"` : ''
  const itemTagString = 'li'
  const itemClassString = itemClass ? ` class="${htmlEscape(itemClass)}"` : ''
  const linkTagString = htmlEscape(linkTag)
  const linkClassString = linkClass ? ` class="${htmlEscape(linkClass)}` : ''
  const linkTo = (slug: string): string =>
    linkTag === 'RouterLink' ? ` to="#${slug}"` : ` href="#${slug}"`

  const renderHeaders: RenderHeadersFn = (headers) => `\
<${listTagString}${listClassString}>\
${headers
  .map(
    (header) => `\
<${itemTagString}${itemClassString}${itemClassString}>\
<${linkTagString}${linkClassString}${linkTo(header.slug)}>\
${header.title}\
</${linkTagString}>\
${header.children.length > 0 ? renderHeaders(header.children) : ''}\
</${itemTagString}>\
`
  )
  .join('')}\
</${listTagString}>`

  return renderHeaders
}
