import * as MarkdownIt from 'markdown-it'
import { codePlugin, importCodePlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'
import { fs, path } from '@vuepress/utils'

const jsFixturePathRelative = '../__fixtures__/importCode.js'
const mdFixturePathRelative = '../__fixtures__/importCode.md'
const jsFixturePath = path.resolve(__dirname, jsFixturePathRelative)
const mdFixturePath = path.resolve(__dirname, mdFixturePathRelative)
const jsFixtureContent = fs.readFileSync(jsFixturePath).toString()
const mdFixtureContent = fs.readFileSync(mdFixturePath).toString()

describe('@vuepress/markdown > plugins > importCodePlugin', () => {
  it('should not be parsed as import code syntax', () => {
    const source = [
      '@[cod',
      '@[code',
      '@[code]',
      '@[code](./foo.js',
      '@[code](/path/to/foo.js',
      '@[coda](/path/to/foo.js',
    ]

    const md = MarkdownIt().use(importCodePlugin)
    const env: MarkdownEnv = {
      filePath: __filename,
    }
    const rendered = md.render(source.join('\n\n'), env)

    expect(rendered).toEqual(
      source.map((item) => `<p>${item}</p>`).join('\n') + '\n'
    )
    expect(env.importedFiles).toBeUndefined()
  })

  describe('lines range', () => {
    it('should import all lines', () => {
      const source = `\
@[code](${jsFixturePathRelative})
@[code](${mdFixturePathRelative})
`

      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([jsFixturePath, mdFixturePath])
    })

    it('should import partial lines', () => {
      const source = `\
@[code{1-2}](${jsFixturePathRelative})
@[code{1-}](${jsFixturePathRelative})
@[code{4-5}](${mdFixturePathRelative})
@[code{-5}](${mdFixturePathRelative})
`

      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent.split('\n').slice(0, 2).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-js">\
${jsFixtureContent.split('\n').slice(0).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent.split('\n').slice(3, 5).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
<pre><code class="language-md">\
${mdFixtureContent.split('\n').slice(0, 5).join('\n').replace(/\n?$/, '\n')}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([
        jsFixturePath,
        jsFixturePath,
        mdFixturePath,
        mdFixturePath,
      ])
    })
  })

  describe('code language', () => {
    it('should use user defined language', () => {
      const source = `\
@[code](/foo.js)
@[code ts](/bar.md)
`

      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-ts">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js', '/bar.md'])
    })

    it('should use file ext as fallback language', () => {
      const source = `\
@[code](/foo.js)
@[code](/bar.md)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-md">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js', '/bar.md'])
    })
  })

  describe('path resolving', () => {
    it('should resolve relative path according to filePath', () => {
      const source = `\
@[code](/foo.js)
@[code](./bar.js)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([
        '/foo.js',
        path.resolve(__dirname, './bar.js'),
      ])
    })

    it('should not resolve relative path if filePath is not provided', () => {
      const source = `\
@[code](/foo.js)
@[code](./bar.js)
`
      const expected = `\
<pre><code class="language-js">File not found</code></pre>
<pre><code class="language-js">Error when resolving path</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: null,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/foo.js'])
    })

    it('should handle import path correctly', () => {
      const source = `\
@[code](@fixtures/importCode.js)
`
      const expected = `\
<pre><code class="language-js">\
${jsFixtureContent}\
</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin, {
        handleImportPath: (str: string): string =>
          str.replace(/^@fixtures/, path.resolve(__dirname, '../__fixtures__')),
      })
      const env: MarkdownEnv = {
        filePath: null,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual([jsFixturePath])
    })
  })

  describe('compatibility with other markdown syntax', () => {
    it('should terminate paragraph', () => {
      const source = `\
foo
@[code](/path/to/foo.js)
`
      const expected = `\
<p>foo</p>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/path/to/foo.js'])
    })

    it('should terminate blockquote', () => {
      const source = `\
> foo
@[code](/path/to/foo.js)
`
      const expected = `\
<blockquote>
<p>foo</p>
</blockquote>
<pre><code class="language-js">File not found</code></pre>
`

      const md = MarkdownIt().use(importCodePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toEqual(expected)
      expect(env.importedFiles).toEqual(['/path/to/foo.js'])
    })
  })

  describe('compatibility with codePlugin', () => {
    it('should work with syntax supported by codePlugin', () => {
      const source = `\
@[code js{1,3-4}](${jsFixturePathRelative})
@[code md:no-line-numbers](${mdFixturePathRelative})
`

      const md = MarkdownIt().use(importCodePlugin).use(codePlugin)
      const env: MarkdownEnv = {
        filePath: __filename,
      }
      const rendered = md.render(source, env)

      expect(rendered).toMatchSnapshot()
      expect(env.importedFiles).toEqual([jsFixturePath, mdFixturePath])
    })
  })
})
