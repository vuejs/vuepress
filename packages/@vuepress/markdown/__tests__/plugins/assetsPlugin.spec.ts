import * as MarkdownIt from 'markdown-it'
import { assetsPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

const source = [
  '![foo](./foo.png)',
  '![foo-bar](./foo/bar.png)',
  '![absolute](/absolute.png)',
  '![empty]()',
].join('\n\n')

describe('@vuepress/markdown > plugins > assetsPlugin', () => {
  it('should handle assets link with default options', () => {
    const md = MarkdownIt().use(assetsPlugin)
    const env: MarkdownEnv = {
      filePathRelative: 'foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="@source/foo.png" alt="foo">',
        '<img src="@source/foo/bar.png" alt="foo-bar">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="" alt="empty">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should respect `relativePathPrefix` option', () => {
    const md = MarkdownIt().use(assetsPlugin, {
      relativePathPrefix: '@foo',
    })
    const env: MarkdownEnv = {
      filePathRelative: 'foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="@foo/foo.png" alt="foo">',
        '<img src="@foo/foo/bar.png" alt="foo-bar">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="" alt="empty">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should not handle assets link if `filePathRelative` is not provided', () => {
    const md = MarkdownIt().use(assetsPlugin)
    const env: MarkdownEnv = {}

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="./foo.png" alt="foo">',
        '<img src="./foo/bar.png" alt="foo-bar">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="" alt="empty">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })
})
