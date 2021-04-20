import * as MarkdownIt from 'markdown-it'
import { codePlugin } from '@vuepress/markdown'

const codeFence = '```'

describe('@vuepress/markdown > plugins > codePlugin', () => {
  describe('plugin options', () => {
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

${codeFence}ts{1,2-4,5-5}
const foo = 'foo'

function bar () {
  return 1024
}

const baz = () => {
  return 2048
}
${codeFence}
`

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

    it('should always disable `lineNumbers` if `preWrapper` is disabled', () => {
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

  describe(':line-numbers / :no-line-numbers', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}:line-numbers
Raw text
${codeFence}

${codeFence}:no-line-numbers
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:no-line-numbers
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

${codeFence}ts{1,2}:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:no-line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

    it('should work properly if `lineNumbers` is enabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is disabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe(':v-pre / :no-v-pre', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}:v-pre
Raw text
${codeFence}

${codeFence}:no-v-pre
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:no-v-pre
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

${codeFence}ts{1,2}:v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:no-v-pre
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

    it('should work properly if `vPre` is enabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `vPre` is disabled by default', () => {
      const md = MarkdownIt().use(codePlugin, {
        vPre: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe('syntax highlighting', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}js
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts
const foo: string = 'foo'

function bar (): number {
  return 1024
}
${codeFence}
`

    it('should work if highlighted code is wrapped with `<pre>`', () => {
      const highlight = jest.fn(
        (code, lang) =>
          `<pre><code>highlighted code: ${code}, lang: ${lang}</code></pre>`
      )
      const md = MarkdownIt({ highlight }).use(codePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(3)
    })

    it('should work if highlighted code is not wrapped with `<pre>`', () => {
      const highlight = jest.fn(
        (code, lang) => `highlighted code: ${code}, lang: ${lang}`
      )
      const md = MarkdownIt({ highlight }).use(codePlugin)

      expect(md.render(source)).toMatchSnapshot()
      expect(highlight).toHaveBeenCalledTimes(3)
    })
  })
})
