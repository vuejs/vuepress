import * as MarkdownIt from 'markdown-it'
import { hoistTagsPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

const source = `\
# hello vuepress

{{ msg }}

<docs>
extra hoisted tag
</docs>

<script>
export default {
  setup() {
    return {
      msg: 'foobar'
    }
  }
}
</script>

<style lang="stylus">
.h1
  red
</style>
`

const hoistedScript = source.replace(/^.*(<script>.*<\/script>).*$/s, '$1\n')
const hoistedStyle = source.replace(/^.*(<style .*<\/style>).*$/s, '$1\n')
const hoistedDocs = source.replace(/^.*(<docs>.*<\/docs>).*$/s, '$1\n')

describe('@vuepress/markdown > plugins > hoistTagsPlugin', () => {
  it('should hoist script and style tags', () => {
    const md = MarkdownIt({ html: true }).use(hoistTagsPlugin)
    const env: MarkdownEnv = {}

    const rendered = md.render(source, env)

    expect(env).toEqual({
      hoistedTags: [hoistedScript, hoistedStyle],
    })
    expect(/<(script|style)\b/.test(rendered)).toBe(false)
  })

  it('should hoist docs tags correctly', () => {
    const md = MarkdownIt({ html: true }).use(hoistTagsPlugin, {
      customBlocks: ['docs'],
    })
    const env: MarkdownEnv = {}

    const rendered = md.render(source, env)

    expect(env).toEqual({
      hoistedTags: [hoistedDocs, hoistedScript, hoistedStyle],
    })
    expect(/<(script|style|docs)\b/.test(rendered)).toBe(false)
  })
})
