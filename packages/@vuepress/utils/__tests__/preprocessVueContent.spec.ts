import { preprocessVueContent } from '@vuepress/utils'

const rawContent = `\
<frontmatter>
foo: bar
</frontmatter>

<template>
  <span></span>
</template>
`
const rawContentWithoutFrontmatter = `\
<template>
  <span></span>
</template>
`

describe('utils > preprocessVueContent', () => {
  describe('content', () => {
    it('should get empty content 1', () => {
      const { content } = preprocessVueContent(rawContent)

      expect(content).toBe('')
    })

    it('should get empty content 2', () => {
      const { content } = preprocessVueContent(rawContentWithoutFrontmatter)

      expect(content).toBe('')
    })
  })

  describe('frontmatter', () => {
    it('should get correct frontmatter', () => {
      const { frontmatter } = preprocessVueContent(rawContent)

      expect(frontmatter).toEqual({ foo: 'bar' })
    })

    it('should get empty frontmatter', () => {
      const { frontmatter } = preprocessVueContent(rawContentWithoutFrontmatter)

      expect(frontmatter).toEqual({})
    })
  })

  describe('excerpt', () => {
    it('should get empty excerpt 1', () => {
      const { excerpt } = preprocessVueContent(rawContent)

      expect(excerpt).toBe('')
    })

    it('should get empty excerpt 2', () => {
      const { excerpt } = preprocessVueContent(rawContentWithoutFrontmatter)

      expect(excerpt).toBe('')
    })
  })
})
