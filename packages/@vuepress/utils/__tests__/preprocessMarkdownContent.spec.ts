import { preprocessMarkdownContent } from '@vuepress/utils'

const rawContentWithoutFrontmatterAndExcerpt = `\
# h1

Foo bar
`

const rawContentWithoutFrontmatter = `\
# h1
Foo bar

<!-- more -->

hello
`

const rawContentWithoutExcerpt = `\
---
foo: bar
---
# h1
Foo bar
`

const rawContent = `\
---
foo: bar
---
# h1
Foo bar

<!-- more -->

hello
`

const rawContentWithWrongFrontmatter = `\

---
foo: bar
---
# h1
Foo bar

<!-- more -->

hello
`

const stripFrontmatter = (str: string) => str.replace(/^---\n.*\n---\n/s, '')
const extractExcerpt = (str: string) =>
  str.match(/^(.*)<!-- more -->/s)?.[1] || ''

describe('utils > preprocessMarkdownContent', () => {
  describe('content', () => {
    it('should get stripped content 1', () => {
      const { content } = preprocessMarkdownContent(
        rawContentWithoutFrontmatterAndExcerpt
      )

      expect(content).toBe(
        stripFrontmatter(rawContentWithoutFrontmatterAndExcerpt)
      )
    })

    it('should get stripped content 2', () => {
      const { content } = preprocessMarkdownContent(
        rawContentWithoutFrontmatter
      )

      expect(content).toBe(stripFrontmatter(rawContentWithoutFrontmatter))
    })

    it('should get stripped content 3', () => {
      const { content } = preprocessMarkdownContent(rawContentWithoutExcerpt)

      expect(content).toBe(stripFrontmatter(rawContentWithoutExcerpt))
    })

    it('should get stripped content 4', () => {
      const { content } = preprocessMarkdownContent(rawContent)

      expect(content).toBe(stripFrontmatter(rawContent))
    })

    it('should get stripped content 5', () => {
      const { content } = preprocessMarkdownContent(
        rawContentWithWrongFrontmatter
      )

      expect(content).toBe(stripFrontmatter(rawContentWithWrongFrontmatter))
    })
  })

  describe('frontmatter', () => {
    it('should get correct frontmatter 1', () => {
      const { frontmatter } = preprocessMarkdownContent(
        rawContentWithoutExcerpt
      )

      expect(frontmatter).toEqual({ foo: 'bar' })
    })

    it('should get correct frontmatter 2', () => {
      const { frontmatter } = preprocessMarkdownContent(rawContent)

      expect(frontmatter).toEqual({ foo: 'bar' })
    })

    it('should get empty frontmatter 1', () => {
      const { frontmatter } = preprocessMarkdownContent(
        rawContentWithoutFrontmatterAndExcerpt
      )

      expect(frontmatter).toEqual({})
    })

    it('should get empty frontmatter 2', () => {
      const { frontmatter } = preprocessMarkdownContent(
        rawContentWithoutFrontmatter
      )

      expect(frontmatter).toEqual({})
    })

    it('should get empty frontmatter 3', () => {
      const { frontmatter } = preprocessMarkdownContent(
        rawContentWithWrongFrontmatter
      )

      expect(frontmatter).toEqual({})
    })
  })

  describe('excerpt', () => {
    it('should get correct excerpt 1', () => {
      const { excerpt } = preprocessMarkdownContent(
        rawContentWithoutFrontmatter
      )

      expect(excerpt).toBe(
        extractExcerpt(stripFrontmatter(rawContentWithoutFrontmatter))
      )
    })

    it('should get correct excerpt 2', () => {
      const { excerpt } = preprocessMarkdownContent(rawContent)

      expect(excerpt).toBe(extractExcerpt(stripFrontmatter(rawContent)))
    })

    it('should get correct excerpt 3', () => {
      const { excerpt } = preprocessMarkdownContent(
        rawContentWithWrongFrontmatter
      )

      expect(excerpt).toBe(
        extractExcerpt(stripFrontmatter(rawContentWithWrongFrontmatter))
      )
    })

    it('should get empty excerpt 1', () => {
      const { excerpt } = preprocessMarkdownContent(
        rawContentWithoutFrontmatterAndExcerpt
      )

      expect(excerpt).toBe('')
    })

    it('should get empty excerpt 2', () => {
      const { excerpt } = preprocessMarkdownContent(rawContentWithoutExcerpt)

      expect(excerpt).toBe('')
    })
  })
})
