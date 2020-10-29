import { renderHeadAttrs } from '@vuepress/utils'
import type { HeadAttrsConfig } from '@vuepress/shared'

const testCases: [HeadAttrsConfig, string][] = [
  [
    {
      foo: 'foo',
    },
    ` foo="foo"`,
  ],
  [
    {
      'foo': 'foo',
      'foo-bar': 'foo-bar',
    },
    ` foo="foo" foo-bar="foo-bar"`,
  ],
]

describe('utils > renderHeadAttrs', () => {
  describe('should render head attrs config correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), () => {
        expect(renderHeadAttrs(source)).toBe(expected)
      })
    })
  })
})
