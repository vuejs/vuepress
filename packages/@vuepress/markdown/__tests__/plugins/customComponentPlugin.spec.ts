import * as MarkdownIt from 'markdown-it'
import {
  customComponentPlugin,
  inlineTags,
  vueReservedTags,
} from '@vuepress/markdown'

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
          [`<${comp} @click="onClick" />`, `<${comp} @click="onClick" />`],
          [
            `<${comp} :prop-name="prop" @click="onClick" />`,
            `<${comp} :prop-name="prop" @click="onClick" />`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model" />`,
            `<${comp} :prop-name="prop"\nv-model="model" />`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick" />`,
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick" />`,
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
            `<${comp} @click="onClick"></${comp}>`,
            `<${comp} @click="onClick"></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"></${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick"></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"></${comp}>`,
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
            `<${comp} @click="onClick">foobar</${comp}>`,
            `<${comp} @click="onClick">foobar</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick">foobar</${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick">foobar</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model">foobar</${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model">foobar</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick">foobar</${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick">foobar</${comp}>`,
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
            `<${comp} @click="onClick"><span>foobar</span></${comp}>`,
            `<${comp} @click="onClick"><span>foobar</span></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"><span>foobar</span></${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick"><span>foobar</span></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><span>foobar</span></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><span>foobar</span></${comp}>`,
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
        name: `block element <${comp}>`,
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
            `<${comp} @click="onClick"><div>foobar</div></${comp}>`,
            `<${comp} @click="onClick"><div>foobar</div></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"><div>foobar</div></${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick"><div>foobar</div></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><div>foobar</div></${comp}>`,
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><div>foobar</div></${comp}>`,
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

/**
 * Create test cases with inline tags
 *
 * Notice: if the starting tag and ending tag are in the same line, it will also
 * be treated as block
 */
const createInlineTestCases = (
  tags: string[]
): CustomComponentPluginTestCases[] => {
  const testCases: CustomComponentPluginTestCases[] = []

  tags.forEach((comp) => {
    testCases.push(
      /**
       * self closed
       *
       * @example
       * <span />
       */
      {
        name: `self closed <${comp} />`,
        cases: [
          [`<${comp} />`, `<${comp} />`],
          [`<${comp} :prop-name="prop" />`, `<${comp} :prop-name="prop" />`],
          [`<${comp} @click="onClick" />`, `<${comp} @click="onClick" />`],
          [
            `<${comp} :prop-name="prop" @click="onClick" />`,
            `<${comp} :prop-name="prop" @click="onClick" />`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model" />`,
            `<p><${comp} :prop-name="prop"\nv-model="model" /></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick" />`,
            `<p><${comp} :prop-name="prop"\nv-model="model"\n@click="onClick" /></p>\n`,
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
       * <span></span>
       */
      {
        name: `empty <${comp}>`,
        cases: [
          [`<${comp}></${comp}>`, `<p><${comp}></${comp}></p>\n`],
          [
            `<${comp} :prop-name="prop"></${comp}>`,
            `<p><${comp} :prop-name="prop"></${comp}></p>\n`,
          ],
          [
            `<${comp} @click="onClick"></${comp}>`,
            `<p><${comp} @click="onClick"></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"></${comp}>`,
            `<p><${comp} :prop-name="prop" @click="onClick"></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick">\n</${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick">\n</${comp}>`,
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
       * <span>foobar</span>
       */
      {
        name: `text <${comp}>`,
        cases: [
          [`<${comp}>foobar</${comp}>`, `<p><${comp}>foobar</${comp}></p>\n`],
          [
            `<${comp} :prop-name="prop">foobar</${comp}>`,
            `<p><${comp} :prop-name="prop">foobar</${comp}></p>\n`,
          ],
          [
            `<${comp} @click="onClick">foobar</${comp}>`,
            `<p><${comp} @click="onClick">foobar</${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick">foobar</${comp}>`,
            `<p><${comp} :prop-name="prop" @click="onClick">foobar</${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model">foobar</${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model">foobar</${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick">foobar</${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"\n@click="onClick">foobar</${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick">\nfoobar\n</${comp}>`,
            `<${comp} :prop-name="prop" @click="onClick">\nfoobar\n</${comp}>`,
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
       * <span><span>foobar</span></span>
       */
      {
        name: `inline element <${comp}>`,
        cases: [
          [
            `<${comp}><span>foobar</span></${comp}>`,
            `<p><${comp}><span>foobar</span></${comp}></p>\n`,
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
            `<p><${comp} :prop-name="prop"><span>foobar</span></${comp}></p>\n`,
          ],
          [
            `<${comp} @click="onClick"><span>foobar</span></${comp}>`,
            `<p><${comp} @click="onClick"><span>foobar</span></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"><span>foobar</span></${comp}>`,
            `<p><${comp} :prop-name="prop" @click="onClick"><span>foobar</span></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"><span>foobar</span></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><span>foobar</span></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><span>foobar</span></${comp}></p>\n`,
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
       * <span><div>foobar</div></span>
       *
       * @remark
       * This is invalid HTML an should be avoided
       */
      {
        name: `block element <${comp}>`,
        cases: [
          [
            `<${comp}><div>foobar</div></${comp}>`,
            `<p><${comp}><div>foobar</div></${comp}></p>\n`,
          ],
          [
            `<${comp}>\n<div>foobar</div>\n</${comp}>`,
            `<${comp}>\n<div>foobar</div>\n</${comp}>`,
          ],
          [
            `<${comp} :prop-name="prop"><div>foobar</div></${comp}>`,
            `<p><${comp} :prop-name="prop"><div>foobar</div></${comp}></p>\n`,
          ],
          [
            `<${comp} @click="onClick"><div>foobar</div></${comp}>`,
            `<p><${comp} @click="onClick"><div>foobar</div></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop" @click="onClick"><div>foobar</div></${comp}>`,
            `<p><${comp} :prop-name="prop" @click="onClick"><div>foobar</div></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"><div>foobar</div></${comp}></p>\n`,
          ],
          [
            `<${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><div>foobar</div></${comp}>`,
            `<p><${comp} :prop-name="prop"\nv-model="model"\n@click="onClick"><div>foobar</div></${comp}></p>\n`,
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
          [
            `<${comp}>*foobar*</${comp}>`,
            `<p><${comp}><em>foobar</em></${comp}></p>\n`,
          ],
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

    describe('vue reserved tags', () => {
      const testCases = createTestCases(vueReservedTags)

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
    const expected = '<p>&lt;foo-bar&gt;foobar&lt;/foo-bar&gt;</p>\n'
    const rendered = md.render(source)
    expect(rendered).toBe(expected)

    md.set({ html: true })
  })

  describe('should make native inline tags work with vue template syntax', () => {
    const testCases = createInlineTestCases(
      inlineTags.filter(
        (item) => ![...vueReservedTags, 'script'].includes(item)
      )
    )

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

  describe('compatibility with other markdown syntax', () => {
    it('should work with autolink', () => {
      const source = [
        '<https://github.com>',
        '<localhost:5001/foo>',
        '<made-up-scheme://foo,bar>',
        '<foo@bar.example.com>',
        '<foo+special@Bar.baz-bar0.com>',
        '<a+b+c:d>',
      ].join('\n\n')

      const expected =
        [
          '<a href="https://github.com">https://github.com</a>',
          '<a href="localhost:5001/foo">localhost:5001/foo</a>',
          '<a href="made-up-scheme://foo,bar">made-up-scheme://foo,bar</a>',
          '<a href="mailto:foo@bar.example.com">foo@bar.example.com</a>',
          '<a href="mailto:foo+special@Bar.baz-bar0.com">foo+special@Bar.baz-bar0.com</a>',
          '<a href="a+b+c:d">a+b+c:d</a>',
        ]
          .map((a) => `<p>${a}</p>`)
          .join('\n') + '\n'

      const rendered = md.render(source)
      expect(rendered).toBe(expected)
    })
  })
})
