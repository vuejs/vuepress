// @ts-ignore
import compiler from 'vue-template-compiler'
import { parse as _parse } from '@vue/component-compiler-utils'
import parseFrontmatter from './parseFrontmatter'

export function parseStrippedFrontmatter (src: string) {
  src = `---\n${src}\n---`
  return parseFrontmatter(src)
}

export function parse (src: string) {
  const output = _parse({
    source: src,
    compiler,
    needMap: false
  })
  const find = output.customBlocks.find(block => block.type === 'frontmatter')
  const frontmatterRaw = find && find.content
  if (frontmatterRaw) {
    return parseStrippedFrontmatter(frontmatterRaw)
  }
  return {}
}
