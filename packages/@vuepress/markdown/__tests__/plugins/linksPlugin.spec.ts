import * as MarkdownIt from 'markdown-it'
import { linksPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

describe('@vuepress/markdown > plugins > linksPlugin', () => {
  describe('external links', () => {
    describe('protocol links', () => {
      const source = [
        '[https-github](https://github.com)',
        '[http-github](http://github.com)',
        '[github](//github.com)',
        // autolink
        '<https://github.com>',
        '<http://github.com>',
      ].join('\n\n')

      it('should render default attrs and `<OutboundLink/>`', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github<OutboundLink/></a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer">github<OutboundLink/></a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com<OutboundLink/></a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toBeUndefined()
      })

      it('should add extra attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalAttrs: {
            foo: 'bar',
          },
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer" foo="bar">https-github<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer" foo="bar">http-github<OutboundLink/></a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer" foo="bar">github<OutboundLink/></a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer" foo="bar">https://github.com<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer" foo="bar">http://github.com<OutboundLink/></a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })

      it('should override default attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalAttrs: {
            rel: 'foobar',
          },
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="foobar">https-github<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="foobar">http-github<OutboundLink/></a>',
            '<a href="//github.com" target="_blank" rel="foobar">github<OutboundLink/></a>',
            '<a href="https://github.com" target="_blank" rel="foobar">https://github.com<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="foobar">http://github.com<OutboundLink/></a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })

      it('should not render `<OutboundLink/>` with self target', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalAttrs: {
            target: '_self',
          },
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_self" rel="noopener noreferrer">https-github</a>',
            '<a href="http://github.com" target="_self" rel="noopener noreferrer">http-github</a>',
            '<a href="//github.com" target="_self" rel="noopener noreferrer">github</a>',
            '<a href="https://github.com" target="_self" rel="noopener noreferrer">https://github.com</a>',
            '<a href="http://github.com" target="_self" rel="noopener noreferrer">http://github.com</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })

      it('should not render `<OutboundLink/>` with `externalIcon = false', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalIcon: false,
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github</a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer">github</a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })

      it('should not render `<OutboundLink/>` with `frontmatter.externalIcon = false`', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = { frontmatter: { externalIcon: false } }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github</a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer">github</a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })

      it('`frontmatter.externalIcon` should override `externalIcon` option', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalIcon: false,
        })
        const env: MarkdownEnv = { frontmatter: { externalIcon: true } }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github<OutboundLink/></a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer">github<OutboundLink/></a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com<OutboundLink/></a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com<OutboundLink/></a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )
        expect(env.links).toBeUndefined()
      })
    })

    describe('absolute links', () => {
      const source = [
        '[md](/path/to/index.md)',
        '[html](/path/to/index.html)',
      ].join('\n\n')

      it('should render default attrs and `<OutboundLink/>`', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/base/',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="/path/to/index.md" target="_blank" rel="noopener noreferrer">md<OutboundLink/></a>',
            '<a href="/path/to/index.html" target="_blank" rel="noopener noreferrer">html<OutboundLink/></a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toBeUndefined()
      })
    })
  })

  describe('internal links', () => {
    describe('relative links', () => {
      const source = [
        '[foo1](foo.md)',
        '[foo2](foo.md#hash)',
        '[foo3](./foo.md)',
        '[bar1](../bar.md)',
        '[bar2](../bar.md#hash)',
        '[bar3](./../bar.md)',
        '[foobar1](foo/bar.md)',
        '[foobar2](foo/bar.md#hash)',
        '[foobar3](../foo/bar.md)',
        '[foobar4](../foo/bar.md#hash)',
        '[index1](index.md)',
        '[index2](index.md#hash)',
        '[index3](./index.md)',
        '[index4](../index.md)',
        '[index5](../foo/bar/index.md)',
        '[readme1](readme.md)',
        '[readme2](../readme.md#hash)',
        '[readme3](../foo/bar/readme.md)',
      ].join('\n\n')

      it('should render to <a> tag correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          internalTag: 'a',
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="foo.html">foo1</a>',
            '<a href="foo.html#hash">foo2</a>',
            '<a href="foo.html">foo3</a>',
            '<a href="../bar.html">bar1</a>',
            '<a href="../bar.html#hash">bar2</a>',
            '<a href="../bar.html">bar3</a>',
            '<a href="foo/bar.html">foobar1</a>',
            '<a href="foo/bar.html#hash">foobar2</a>',
            '<a href="../foo/bar.html">foobar3</a>',
            '<a href="../foo/bar.html#hash">foobar4</a>',
            '<a href="">index1</a>',
            '<a href="#hash">index2</a>',
            '<a href="">index3</a>',
            '<a href="../">index4</a>',
            '<a href="../foo/bar/">index5</a>',
            '<a href="">readme1</a>',
            '<a href="../#hash">readme2</a>',
            '<a href="../foo/bar/">readme3</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: './foo.md',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: '../bar.md',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: './../bar.md',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'foo/bar.md',
            absolute: 'foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'foo/bar.md',
            absolute: 'foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: '../foo/bar.md',
            absolute: '../foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: '../foo/bar.md',
            absolute: '../foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: './index.md',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: '../index.md',
            relative: '../index.md',
            absolute: '../index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: '../foo/bar/index.md',
            absolute: '../foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'readme.md',
            absolute: 'readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: '../readme.md',
            absolute: '../readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: '../foo/bar/readme.md',
            absolute: '../foo/bar/readme.md',
          },
        ])
      })

      it('should render relative links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouterLink to="foo.html">foo1</RouterLink>',
            '<RouterLink to="foo.html#hash">foo2</RouterLink>',
            '<RouterLink to="foo.html">foo3</RouterLink>',
            '<RouterLink to="../bar.html">bar1</RouterLink>',
            '<RouterLink to="../bar.html#hash">bar2</RouterLink>',
            '<RouterLink to="../bar.html">bar3</RouterLink>',
            '<RouterLink to="foo/bar.html">foobar1</RouterLink>',
            '<RouterLink to="foo/bar.html#hash">foobar2</RouterLink>',
            '<RouterLink to="../foo/bar.html">foobar3</RouterLink>',
            '<RouterLink to="../foo/bar.html#hash">foobar4</RouterLink>',
            '<RouterLink to="">index1</RouterLink>',
            '<RouterLink to="#hash">index2</RouterLink>',
            '<RouterLink to="">index3</RouterLink>',
            '<RouterLink to="../">index4</RouterLink>',
            '<RouterLink to="../foo/bar/">index5</RouterLink>',
            '<RouterLink to="">readme1</RouterLink>',
            '<RouterLink to="../#hash">readme2</RouterLink>',
            '<RouterLink to="../foo/bar/">readme3</RouterLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: './foo.md',
            relative: 'foo.md',
            absolute: 'foo.md',
          },
          {
            raw: '../bar.md',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: './../bar.md',
            relative: '../bar.md',
            absolute: '../bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'foo/bar.md',
            absolute: 'foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'foo/bar.md',
            absolute: 'foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: '../foo/bar.md',
            absolute: '../foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: '../foo/bar.md',
            absolute: '../foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: './index.md',
            relative: 'index.md',
            absolute: 'index.md',
          },
          {
            raw: '../index.md',
            relative: '../index.md',
            absolute: '../index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: '../foo/bar/index.md',
            absolute: '../foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'readme.md',
            absolute: 'readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: '../readme.md',
            absolute: '../readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: '../foo/bar/readme.md',
            absolute: '../foo/bar/readme.md',
          },
        ])
      })

      it('should convert to absolute links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          filePathRelative: 'path/to/file.md',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouterLink to="/path/to/foo.html">foo1</RouterLink>',
            '<RouterLink to="/path/to/foo.html#hash">foo2</RouterLink>',
            '<RouterLink to="/path/to/foo.html">foo3</RouterLink>',
            '<RouterLink to="/path/bar.html">bar1</RouterLink>',
            '<RouterLink to="/path/bar.html#hash">bar2</RouterLink>',
            '<RouterLink to="/path/bar.html">bar3</RouterLink>',
            '<RouterLink to="/path/to/foo/bar.html">foobar1</RouterLink>',
            '<RouterLink to="/path/to/foo/bar.html#hash">foobar2</RouterLink>',
            '<RouterLink to="/path/foo/bar.html">foobar3</RouterLink>',
            '<RouterLink to="/path/foo/bar.html#hash">foobar4</RouterLink>',
            '<RouterLink to="/path/to/">index1</RouterLink>',
            '<RouterLink to="/path/to/#hash">index2</RouterLink>',
            '<RouterLink to="/path/to/">index3</RouterLink>',
            '<RouterLink to="/path/">index4</RouterLink>',
            '<RouterLink to="/path/foo/bar/">index5</RouterLink>',
            '<RouterLink to="/path/to/">readme1</RouterLink>',
            '<RouterLink to="/path/#hash">readme2</RouterLink>',
            '<RouterLink to="/path/foo/bar/">readme3</RouterLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: './foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: '../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: './../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/to/foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/to/foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: 'path/foo/bar.md',
            absolute: '/path/foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: 'path/foo/bar.md',
            absolute: '/path/foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: './index.md',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: '../index.md',
            relative: 'path/index.md',
            absolute: '/path/index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: 'path/foo/bar/index.md',
            absolute: '/path/foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'path/to/readme.md',
            absolute: '/path/to/readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: 'path/readme.md',
            absolute: '/path/readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: 'path/foo/bar/readme.md',
            absolute: '/path/foo/bar/readme.md',
          },
        ])
      })

      it('should not conflict with base', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/path/',
          filePathRelative: 'path/to/file.md',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouterLink to="/path/to/foo.html">foo1</RouterLink>',
            '<RouterLink to="/path/to/foo.html#hash">foo2</RouterLink>',
            '<RouterLink to="/path/to/foo.html">foo3</RouterLink>',
            '<RouterLink to="/path/bar.html">bar1</RouterLink>',
            '<RouterLink to="/path/bar.html#hash">bar2</RouterLink>',
            '<RouterLink to="/path/bar.html">bar3</RouterLink>',
            '<RouterLink to="/path/to/foo/bar.html">foobar1</RouterLink>',
            '<RouterLink to="/path/to/foo/bar.html#hash">foobar2</RouterLink>',
            '<RouterLink to="/path/foo/bar.html">foobar3</RouterLink>',
            '<RouterLink to="/path/foo/bar.html#hash">foobar4</RouterLink>',
            '<RouterLink to="/path/to/">index1</RouterLink>',
            '<RouterLink to="/path/to/#hash">index2</RouterLink>',
            '<RouterLink to="/path/to/">index3</RouterLink>',
            '<RouterLink to="/path/">index4</RouterLink>',
            '<RouterLink to="/path/foo/bar/">index5</RouterLink>',
            '<RouterLink to="/path/to/">readme1</RouterLink>',
            '<RouterLink to="/path/#hash">readme2</RouterLink>',
            '<RouterLink to="/path/foo/bar/">readme3</RouterLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: './foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: '../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: './../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/path/to/foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/path/to/foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: 'path/foo/bar.md',
            absolute: '/path/path/foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: 'path/foo/bar.md',
            absolute: '/path/path/foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: './index.md',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: '../index.md',
            relative: 'path/index.md',
            absolute: '/path/path/index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: 'path/foo/bar/index.md',
            absolute: '/path/path/foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'path/to/readme.md',
            absolute: '/path/path/to/readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: 'path/readme.md',
            absolute: '/path/path/readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: 'path/foo/bar/readme.md',
            absolute: '/path/path/foo/bar/readme.md',
          },
        ])
      })
    })

    describe('absolute links', () => {
      const source = [
        '[md](/base/path/to/index.md)',
        '[html](/base/path/to/index.html)',
      ].join('\n\n')

      it('should resolve to internal links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/base/',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouterLink to="/path/to/">md</RouterLink>',
            '<RouterLink to="/path/to/index.html">html</RouterLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n'
        )

        expect(env.links).toEqual([
          {
            raw: '/base/path/to/index.md',
            relative: 'path/to/index.md',
            absolute: '/base/path/to/index.md',
          },
          {
            raw: '/base/path/to/index.html',
            relative: 'path/to/index.html',
            absolute: '/base/path/to/index.html',
          },
        ])
      })
    })
  })

  describe('empty links', () => {
    it('should render correctly', () => {
      const md = MarkdownIt({ html: true }).use(linksPlugin)
      const env: MarkdownEnv = {}

      const rendered = md.render('[empty]()', env)

      expect(rendered).toEqual('<p><a href="">empty</a></p>\n')
      expect(env.links).toBeUndefined()
    })
  })
})
