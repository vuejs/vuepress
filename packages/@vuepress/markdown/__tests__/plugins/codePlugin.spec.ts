import * as MarkdownIt from 'markdown-it'
import { codePlugin } from '@vuepress/markdown'

const codeFence = '```'

const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

describe('@vuepress/markdown > plugins > codePlugin', () => {
  it('should process code fences with default options', () => {
    const md = MarkdownIt().use(codePlugin)

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should disable `highlight`', () => {
    const md = MarkdownIt().use(codePlugin, {
      highlight: false,
    })

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should enable `lineNumbers`', () => {
    const md = MarkdownIt().use(codePlugin, {
      lineNumbers: true,
    })

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should disable `preWrapper`', () => {
    const md = MarkdownIt().use(codePlugin, {
      preWrapper: false,
    })

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should disable `vPre`', () => {
    const md = MarkdownIt().use(codePlugin, {
      vPre: false,
    })

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should always disable `lineNumber` if `preWrapper` is disabled', () => {
    const mdWithLineNumbers = MarkdownIt().use(codePlugin, {
      lineNumbers: true,
      preWrapper: false,
    })
    const mdWithoutLineNumbers = MarkdownIt().use(codePlugin, {
      lineNumbers: false,
      preWrapper: false,
    })

    expect(mdWithLineNumbers.render(source)).toBe(
      mdWithoutLineNumbers.render(source)
    )
  })
})
