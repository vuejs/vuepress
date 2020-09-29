import * as MarkdownIt from 'markdown-it'
import { customComponentPlugin } from '@vuepress/markdown'

const md = MarkdownIt({ html: true }).use(customComponentPlugin)

interface CustomComponentPluginTestCases {
  name: string
  cases: [string, string][]
}

// create test cases with specified component names
const createTestCases = (
  componentNames: string[]
): CustomComponentPluginTestCases[] => {
  const testCases: CustomComponentPluginTestCases[] = []

  componentNames.forEach((comp) => {
    testCases.push(
      /**
       * self closed
       *
       * @example
       * <FooBar />
       */
      {
        name: `self closed <${comp} />`,
        cases: [
          [`<${comp} />`, `<${comp} />`],
          [`<${comp} :prop-name="prop" />`, `<${comp} :prop-name="prop" />`],
          [
            `<${comp} :prop-name="prop"\nv-model="model" />`,
            `<${comp} :prop-name="prop"\nv-model="model" />`,
          ],
          [`# h1 <${comp} />`, `<h1>h1 <${comp} /></h1>\n`],
          [
            `# h1 <${comp} :prop-name="prop" />`,
            `<h1>h1 <${comp} :prop-name="prop" /></h1>\n`,
          ],
        ],
      },

      /**
       * empty
       *
       * @example
       * <FooBar></FooBar>
       */
      {
        name: `empty <${comp}>`,
        cases: [
          [`<${comp}></${comp}>`, `<${comp}></${comp}>`],
          [
            `<${comp} :prop-name="prop"></${comp}>`,
            `<${comp} :prop-name="prop"></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"></${comp}>`,
          ],
          [`# h1 <${comp}></${comp}>`, `<h1>h1 <${comp}></${comp}></h1>\n`],
          [
            `# h1 <${comp} :prop-name="prop"></${comp}>`,
            `<h1>h1 <${comp} :prop-name="prop"></${comp}></h1>\n`,
          ],
        ],
      },

      /**
       * text
       *
       * @example
       * <FooBar>foobar</FooBar>
       */
      {
        name: `text <${comp}>`,
        cases: [
          [`<${comp}>foobar</${comp}>`, `<${comp}>foobar</${comp}>`],
          [
            `<${comp} :prop-name="prop">foobar</${comp}>`,
            `<${comp} :prop-name="prop">foobar</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model">foobar</${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model">foobar</${comp}>`,
          ],
          [
            `# h1 <${comp}>foobar</${comp}>`,
            `<h1>h1 <${comp}>foobar</${comp}></h1>\n`,
          ],
          [
            `# h1 <${comp} :prop-name="prop">foobar</${comp}>`,
            `<h1>h1 <${comp} :prop-name="prop">foobar</${comp}></h1>\n`,
          ],
        ],
      },

      /**
       * inline element
       *
       * @example
       * <FooBar><span>foobar</span></FooBar>
       */
      {
        name: `inline element <${comp}>`,
        cases: [
          [
            `<${comp}><span>foobar</span></${comp}>`,
            `<${comp}><span>foobar</span></${comp}>`,
          ],
          [
            `<${comp}>\n<span>foobar</span>\n</${comp}>`,
            `<${comp}>\n<span>foobar</span>\n</${comp}>`,
          ],
          [
            `<${comp}>\n\n<span>foobar</span>\n\n</${comp}>`,
            `<${comp}>\n<p><span>foobar</span></p>\n</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"><span>foobar</span></${comp}>`,
            `<${comp} :prop-name="prop"><span>foobar</span></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}>`,
          ],
          [
            `# h1 <${comp}><span>foobar</span></${comp}>`,
            `<h1>h1 <${comp}><span>foobar</span></${comp}></h1>\n`,
          ],
          [
            `# h1 <${comp} :prop-name="prop"><span>foobar</span></${comp}>`,
            `<h1>h1 <${comp} :prop-name="prop"><span>foobar</span></${comp}></h1>\n`,
          ],
        ],
      },

      /**
       * block element
       *
       * @example
       * <FooBar><div>foobar</div></FooBar>
       */
      {
        name: `inline element <${comp}>`,
        cases: [
          [
            `<${comp}><div>foobar</div></${comp}>`,
            `<${comp}><div>foobar</div></${comp}>`,
          ],
          [
            `<${comp}>\n<div>foobar</div>\n</${comp}>`,
            `<${comp}>\n<div>foobar</div>\n</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"><div>foobar</div></${comp}>`,
            `<${comp} :prop-name="prop"><div>foobar</div></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}>`,
          ],
          [
            `# h1 <${comp}><div>foobar</div></${comp}>`,
            `<h1>h1 <${comp}><div>foobar</div></${comp}></h1>\n`,
          ],
          [
            `# h1 <${comp} :prop-name="prop"><div>foobar</div></${comp}>`,
            `<h1>h1 <${comp} :prop-name="prop"><div>foobar</div></${comp}></h1>\n`,
          ],
        ],
      },

      /**
       * markdown syntax
       *
       * @example
       * <FooBar>*foobar*</FooBar>
       *
       * <FooBar>
       * - foo
       * - bar
       * </FooBar>
       */
      {
        name: `markdown syntax <${comp}>`,
        cases: [
          [`<${comp}>*foobar*</${comp}>`, `<${comp}>*foobar*</${comp}>`],
          [
            `\
<${comp}>
*foobar*
</${comp}>`,
            `\
<${comp}>
*foobar*
</${comp}>`,
          ],
          [
            `\
<${comp}>

*foobar*

</${comp}>`,
            `\
<${comp}>
<p><em>foobar</em></p>
</${comp}>`,
          ],
          [
            `\
<${comp}>
- foo
- bar
</${comp}>`,
            `\
<${comp}>
- foo
- bar
</${comp}>`,
          ],
          [
            `\
<${comp}>

- foo
- bar

</${comp}>`,
            `\
<${comp}>
<ul>
<li>foo</li>
<li>bar</li>
</ul>
</${comp}>`,
          ],

          // edge case
          // the blockquote should not be terminated
          // and the custom component should be treated as inline tag
          [
            `\
> foo
    <${comp}>foobar</${comp}>
`,
            `\
<blockquote>
<p>foo
<${comp}>foobar</${comp}></p>
</blockquote>
`,
          ],

          // edge case
          // if there is no matching end tag, the block will keep opening
          [
            `\
- <${comp}>
- foo
`,
            `\
<ul>
<li>
<${comp}>
</li>
<li>foo</li>
</ul>
`,
          ],
        ],
      }
    )
  })

  return testCases
}

describe('@vuepress/markdown > plugins > customComponentPlugin', () => {
  describe('should render custom components as normal html blocks', () => {
    describe('PascalCase components', () => {
      const testCases = createTestCases([
        'FooBar',
        'V123',
        'DivCustom',
        'SpanCustom',
      ])

      testCases.forEach(({ name, cases }) => {
        describe(name, () => {
          cases.forEach(([source, expected], index) => {
            it(`case ${index}`, () => {
              const rendered = md.render(source)
              expect(rendered).toBe(expected)
            })
          })
        })
      })
    })

    describe('camelCase components', () => {
      const testCases = createTestCases([
        'fooBar',
        'v123',
        'divCustom',
        'spanCustom',
      ])

      testCases.forEach(({ name, cases }) => {
        describe(name, () => {
          cases.forEach(([source, expected], index) => {
            it(`case ${index}`, () => {
              const rendered = md.render(source)
              expect(rendered).toBe(expected)
            })
          })
        })
      })
    })

    describe('kebab-case components', () => {
      const testCases = createTestCases([
        'foo-bar',
        'v-123',
        'div-custom',
        'span-custom',
      ])

      testCases.forEach(({ name, cases }) => {
        describe(name, () => {
          cases.forEach(([source, expected], index) => {
            it(`case ${index}`, () => {
              const rendered = md.render(source)
              expect(rendered).toBe(expected)
            })
          })
        })
      })
    })
  })

  it('should not treat custom components as html blocks if html option is disabled', () => {
    md.set({ html: false })

    const source = '<foo-bar>foobar</foo-bar>'
    const expected = '<foo-bar>foobar</foo-bar>'
    const rendered = md.render(source)
    expect(rendered).not.toBe(expected)

    md.set({ html: true })
  })

  describe('some behaviors of original html block ruler (mainly for coverage purpose)', () => {
    describe('those html blocks whose ending tag is not required to be followed with an empty line', () => {
      it('ending tag in the same line as starting tag', () => {
        const source = '<pre>foobar</pre>'
        const expected = '<pre>foobar</pre>'
        const rendered = md.render(source)
        expect(rendered).toBe(expected)
      })

      it('ending tag in different line from starting tag', () => {
        const source = '<pre>foobar\n</pre>'
        const expected = '<pre>foobar\n</pre>'
        const rendered = md.render(source)
        expect(rendered).toBe(expected)
      })
    })
  })
})
