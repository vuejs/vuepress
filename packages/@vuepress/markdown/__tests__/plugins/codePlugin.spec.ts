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

${codeFence}ts{1,2}
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

  it('should disable `highlightLines`', () => {
    const md = MarkdownIt().use(codePlugin, {
      highlightLines: false,
    })

    expect(md.render(source)).toMatchSnapshot()
  })

  it('should disable `lineNumbers`', () => {
    const md = MarkdownIt().use(codePlugin, {
      lineNumbers: false,
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

  it('should always disable `highlightLines` if `preWrapper` is disabled', () => {
    const mdWithHighlightLines = MarkdownIt().use(codePlugin, {
      highlightLines: true,
      preWrapper: false,
    })
    const mdWithoutHighlightLine = MarkdownIt().use(codePlugin, {
      highlightLines: false,
      preWrapper: false,
    })

    expect(mdWithHighlightLines.render(source)).toBe(
      mdWithoutHighlightLine.render(source)
    )
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
