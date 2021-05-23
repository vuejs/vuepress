import * as MarkdownIt from 'markdown-it'
import { assetsPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

const source = [
  // relative paths
  '![foo](./foo.png)',
  '![foo2](../sub/foo.png)',
  '![foo-bar](./foo/bar.png)',
  '![foo-bar2](../sub/foo/bar.png)',
  '![baz](../baz.png)',
  '![out](../../out.png)',
  '![汉字](./汉字.png)',
  '![100%](./100%.png)',
  // aliases
  '![alias](@alias/foo.png)',
  '![汉字](@alias/汉字.png)',
  '![100%](@alias/100%.png)',
  // webpack legacy aliases
  '![~alias](~@alias/foo.png)',
  '![~汉字](~@alias/汉字.png)',
  '![~100%](~@alias/100%.png)',
  // keep as is
  '![absolute](/absolute.png)',
  '![url](http://foobar.com/icon.png)',
  '![empty]()',
  // invalid paths
  '![invalid](.../invalid.png)',
  '![汉字](.../汉字.png)',
  '![100%](.../100%.png)',
].join('\n\n')

describe('@vuepress/markdown > plugins > assetsPlugin', () => {
  it('should handle assets link with default options', () => {
    const md = MarkdownIt().use(assetsPlugin)
    const env: MarkdownEnv = {
      filePathRelative: 'sub/foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        // relative paths
        '<img src="@source/sub/foo.png" alt="foo">',
        '<img src="@source/sub/foo.png" alt="foo2">',
        '<img src="@source/sub/foo/bar.png" alt="foo-bar">',
        '<img src="@source/sub/foo/bar.png" alt="foo-bar2">',
        '<img src="@source/baz.png" alt="baz">',
        '<img src="@source/../out.png" alt="out">',
        '<img src="@source/sub/汉字.png" alt="汉字">',
        '<img src="@source/sub/100%.png" alt="100%">',
        // aliases
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="@alias/汉字.png" alt="汉字">',
        '<img src="@alias/100%.png" alt="100%">',
        // webpack legacy aliases
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="~@alias/汉字.png" alt="~汉字">',
        '<img src="~@alias/100%.png" alt="~100%">',
        // keep as is
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        // invalid paths
        '<img src=".../invalid.png" alt="invalid">',
        '<img src=".../汉字.png" alt="汉字">',
        '<img src=".../100%.png" alt="100%">',
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
      filePathRelative: 'sub/foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        // relative paths
        '<img src="@foo/sub/foo.png" alt="foo">',
        '<img src="@foo/sub/foo.png" alt="foo2">',
        '<img src="@foo/sub/foo/bar.png" alt="foo-bar">',
        '<img src="@foo/sub/foo/bar.png" alt="foo-bar2">',
        '<img src="@foo/baz.png" alt="baz">',
        '<img src="@foo/../out.png" alt="out">',
        '<img src="@foo/sub/汉字.png" alt="汉字">',
        '<img src="@foo/sub/100%.png" alt="100%">',
        // aliases
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="@alias/汉字.png" alt="汉字">',
        '<img src="@alias/100%.png" alt="100%">',
        // webpack legacy aliases
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="~@alias/汉字.png" alt="~汉字">',
        '<img src="~@alias/100%.png" alt="~100%">',
        // keep as is
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        // invalid paths
        '<img src=".../invalid.png" alt="invalid">',
        '<img src=".../汉字.png" alt="汉字">',
        '<img src=".../100%.png" alt="100%">',
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
        // relative paths
        '<img src="./foo.png" alt="foo">',
        '<img src="../sub/foo.png" alt="foo2">',
        '<img src="./foo/bar.png" alt="foo-bar">',
        '<img src="../sub/foo/bar.png" alt="foo-bar2">',
        '<img src="../baz.png" alt="baz">',
        '<img src="../../out.png" alt="out">',
        '<img src="./汉字.png" alt="汉字">',
        '<img src="./100%.png" alt="100%">',
        // aliases
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="@alias/汉字.png" alt="汉字">',
        '<img src="@alias/100%.png" alt="100%">',
        // webpack legacy aliases
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="~@alias/汉字.png" alt="~汉字">',
        '<img src="~@alias/100%.png" alt="~100%">',
        // keep as is
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        // invalid paths
        '<img src=".../invalid.png" alt="invalid">',
        '<img src=".../汉字.png" alt="汉字">',
        '<img src=".../100%.png" alt="100%">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })
})
